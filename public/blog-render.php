<?php
declare(strict_types=1);

const BLOG_ORIGIN = 'https://myexclusiverentals.com';
const BLOG_SITE_NAME = 'My Exclusive Rentals';
const BLOG_SLUG = '[a-z0-9][a-z0-9-]*';

function escapeHtml(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function publishedPosts(array $config, ?string $slug = null): array
{
    $project = $config['projectId'] ?? '';
    $site = $config['siteId'] ?? '';
    if (!is_string($project) || !preg_match('/^[a-z0-9][a-z0-9-]*$/D', $project)
        || !is_string($site) || trim($site) === '') {
        throw new RuntimeException('Invalid blog configuration');
    }

    $filters = [];
    foreach (array_filter(['siteId' => $site, 'status' => 'published', 'slug' => $slug], 'is_string') as $field => $value) {
        $filters[] = ['fieldFilter' => [
            'field' => ['fieldPath' => $field],
            'op' => 'EQUAL',
            'value' => ['stringValue' => $value],
        ]];
    }
    $query = [
        'from' => [['collectionId' => 'blogPosts']],
        'where' => ['compositeFilter' => ['op' => 'AND', 'filters' => $filters]],
    ];
    if ($slug !== null) {
        $query['limit'] = 2;
    } else {
        $query['select'] = ['fields' => array_map(
            static fn (string $field): array => ['fieldPath' => $field],
            ['slug', 'canonicalUrl', 'publishedAt', 'updatedAt']
        )];
        $query['orderBy'] = [['field' => ['fieldPath' => 'publishedAt'], 'direction' => 'DESCENDING']];
    }

    $url = "https://firestore.googleapis.com/v1/projects/{$project}/databases/(default)/documents:runQuery";
    $request = curl_init($url);
    curl_setopt_array($request, [
        CURLOPT_POSTFIELDS => json_encode(['structuredQuery' => $query], JSON_THROW_ON_ERROR),
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 3,
        CURLOPT_TIMEOUT => 8,
    ]);
    $response = curl_exec($request);
    $status = curl_getinfo($request, CURLINFO_RESPONSE_CODE);
    if (!is_string($response) || $status !== 200) {
        throw new RuntimeException('Published blog query failed with HTTP status ' . $status);
    }

    $rows = json_decode($response, true, 512, JSON_THROW_ON_ERROR);
    if (!is_array($rows) || !array_is_list($rows)) {
        throw new RuntimeException('Invalid published blog response');
    }
    $posts = [];
    foreach ($rows as $row) {
        $fields = $row['document']['fields'] ?? null;
        if (!is_array($fields)) {
            continue;
        }
        $post = [];
        foreach (['title', 'slug', 'excerpt', 'content', 'imageUrl', 'imageAlt', 'author', 'category',
            'seoTitle', 'metaDescription', 'canonicalUrl', 'publishedAt', 'updatedAt'] as $field) {
            $post[$field] = trim($fields[$field]['stringValue'] ?? $fields[$field]['timestampValue'] ?? '');
        }
        $post['title'] = $post['title'] ?: 'Untitled story';
        $post['tags'] = array_filter(array_column($fields['tags']['arrayValue']['values'] ?? [], 'stringValue'), 'strlen');
        $postSlug = $post['slug'];
        if (!preg_match('~^' . BLOG_SLUG . '$~D', $postSlug) || ($slug !== null && $postSlug !== $slug)) {
            continue;
        }
        if (isset($posts[$postSlug])) {
            throw new RuntimeException('Published blog posts share a slug');
        }
        $posts[$postSlug] = $post;
    }
    return $posts;
}

function absoluteBlogUrl(string $value): string
{
    if (str_starts_with($value, '/') && !str_starts_with($value, '//') && !str_contains($value, '\\')) {
        return BLOG_ORIGIN . $value;
    }
    $url = parse_url($value);
    return in_array(strtolower($url['scheme'] ?? ''), ['http', 'https'], true) && isset($url['host'])
        ? $value : '';
}

function canonicalBlogUrl(array $post): string
{
    $own = BLOG_ORIGIN . '/blog/' . $post['slug'] . '/';
    $configured = absoluteBlogUrl($post['canonicalUrl']);
    if ($configured === '') {
        return $own;
    }
    $url = parse_url($configured);
    if (!in_array(strtolower($url['host']), ['myexclusiverentals.com', 'www.myexclusiverentals.com'], true)) {
        return $configured;
    }
    $path = rtrim($url['path'] ?? '', '/') . '/';
    return in_array($path, ['/blog/', '/blog/__article/'], true) ? $own
        : BLOG_ORIGIN . $path . (isset($url['query']) ? '?' . $url['query'] : '')
            . (isset($url['fragment']) ? '#' . $url['fragment'] : '');
}

function blogDate(string $value): ?DateTimeImmutable
{
    if (!preg_match('/^\d{4}-\d{2}-\d{2}/', $value)) {
        return null;
    }
    try {
        return new DateTimeImmutable($value);
    } catch (Exception $error) {
        return null;
    }
}

function articleMarkup(array $post, string $image, array $schema): string
{
    $paragraphs = preg_split('/\R\s*\R/u', $post['content'], -1, PREG_SPLIT_NO_EMPTY) ?: [];
    $date = blogDate($post['publishedAt']);
    $details = array_filter([$post['category'], $date ? $date->format('j F Y') : '',
        $post['author'] ? 'By ' . $post['author'] : ''], 'strlen');
    ob_start();
    ?>
    <article class="px-4 pb-24 pt-40 md:pb-32 md:pt-52">
      <div class="container mx-auto max-w-7xl">
        <a href="/blog/" class="mb-12 inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-dark/50 hover:text-gold">← Back to Blog</a>
        <header class="mx-auto max-w-6xl text-left">
          <h1 class="break-words font-serif text-4xl leading-[1.02] text-dark md:text-6xl lg:text-7xl"><?= escapeHtml($post['title']) ?></h1>
          <?php if ($post['excerpt'] !== ''): ?>
            <p class="mt-8 max-w-3xl font-sans text-lg font-light leading-relaxed text-dark/55 md:text-xl"><?= escapeHtml($post['excerpt']) ?></p>
          <?php endif; ?>
          <div class="mt-9 flex flex-wrap gap-x-4 gap-y-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-dark/45">
            <?php foreach ($details as $detail): ?><span><?= escapeHtml($detail) ?></span><?php endforeach; ?>
          </div>
        </header>
        <div class="relative mx-auto mt-14 aspect-[16/9] max-w-6xl overflow-hidden bg-soft-gray md:mt-20">
          <?php if ($image !== ''): ?>
            <img src="<?= escapeHtml($image) ?>" alt="<?= escapeHtml($post['imageAlt'] ?: $post['title']) ?>" class="absolute inset-0 h-full w-full object-cover" fetchpriority="high">
          <?php endif; ?>
        </div>
        <div class="mx-auto mt-16 max-w-6xl border-t border-dark/10 pt-12 md:mt-24 md:pt-16">
          <div class="space-y-8">
            <?php foreach ($paragraphs as $paragraph): ?>
              <p class="break-words whitespace-pre-line font-sans text-lg font-light leading-[1.9] text-dark/70"><?= escapeHtml(trim($paragraph)) ?></p>
            <?php endforeach; ?>
            <?php if (!$paragraphs): ?>
              <p class="font-sans text-lg font-light leading-relaxed text-dark/55">This story does not have any published content yet.</p>
            <?php endif; ?>
          </div>
          <?php if ($post['tags']): ?>
            <div class="mt-16 flex flex-wrap gap-3 border-t border-dark/10 pt-8" aria-label="Article tags">
              <?php foreach ($post['tags'] as $tag): ?>
                <span class="border border-gold/30 px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-dark/55"><?= escapeHtml($tag) ?></span>
              <?php endforeach; ?>
            </div>
          <?php endif; ?>
        </div>
      </div>
      <script type="application/ld+json"><?= json_encode($schema, JSON_HEX_TAG | JSON_INVALID_UTF8_SUBSTITUTE) ?></script>
    </article>
    <?php
    return ob_get_clean();
}

function renderArticle(string $shell, array $post): string
{
    $title = $post['seoTitle'] ?: $post['title'];
    $description = $post['metaDescription'] ?: $post['excerpt'];
    $description = $description ?: mb_substr($post['content'], 0, 160, 'UTF-8');
    $image = absoluteBlogUrl($post['imageUrl']);
    $socialImage = $image ?: BLOG_ORIGIN . '/Hero-Image-9-1-1920x720.jpg';
    $canonical = canonicalBlogUrl($post);
    $schema = array_filter([
        '@context' => 'https://schema.org',
        '@type' => 'BlogPosting',
        'headline' => $post['title'],
        'description' => $description,
        'image' => $image,
        'datePublished' => $post['publishedAt'],
        'dateModified' => $post['updatedAt'] ?: $post['publishedAt'],
        'mainEntityOfPage' => $canonical,
        'author' => $post['author'] ? ['@type' => 'Person', 'name' => $post['author']] : null,
        'publisher' => ['@type' => 'Organization', 'name' => BLOG_SITE_NAME, 'url' => BLOG_ORIGIN,
            'logo' => ['@type' => 'ImageObject', 'url' => BLOG_ORIGIN . '/er-logo.png']],
    ]);
    $head = '<title>' . escapeHtml($title . ' | ' . BLOG_SITE_NAME) . '</title>'
        . '<link rel="canonical" href="' . escapeHtml($canonical) . '">';
    foreach (['name' => ['description' => $description, 'twitter:card' => 'summary_large_image',
        'twitter:title' => $title, 'twitter:description' => $description, 'twitter:image' => $socialImage],
        'property' => ['og:title' => $title, 'og:description' => $description, 'og:type' => 'article',
            'og:url' => $canonical, 'og:image' => $socialImage, 'article:published_time' => $post['publishedAt'],
            'article:modified_time' => $post['updatedAt']]] as $attribute => $metadata) {
        foreach (array_filter($metadata, 'strlen') as $key => $value) {
            $head .= '<meta ' . $attribute . '="' . $key . '" content="' . escapeHtml($value) . '">';
        }
    }
    $shell = preg_replace_callback('~<head>.*?</head>~s', static function (array $match) use ($head): string {
        $content = preg_replace('~<title>.*?</title>|<meta (?=(?:name="(?:description|twitter:[^"]+)"|property="og:(?:title|description|type|url|image)"))[^>]*>|<link rel="canonical"[^>]*>~s', '', $match[0]);
        return str_replace('</head>', $head . '</head>', $content);
    }, $shell, 1, $headCount);
    $html = str_replace('<div id="server-blog-content"></div>',
        '<div id="server-blog-content">' . articleMarkup($post, $image, $schema) . '</div>',
        $shell, $slotCount);
    if ($headCount !== 1 || $slotCount !== 1) {
        throw new RuntimeException('Blog renderer requires a matching Next.js export');
    }
    return $html;
}

function renderSitemap(string $staticSitemap, array $posts): string
{
    $xml = new DOMDocument();
    if (!$xml->loadXML($staticSitemap, LIBXML_NONET) || $xml->documentElement->localName !== 'urlset') {
        throw new RuntimeException('Invalid exported sitemap');
    }
    $namespace = $xml->documentElement->namespaceURI;
    $latest = null;
    $blogIndex = null;
    foreach (iterator_to_array($xml->getElementsByTagName('url')) as $entry) {
        $loc = $entry->getElementsByTagName('loc')->item(0)->textContent ?? '';
        if ($loc === BLOG_ORIGIN . '/blog/') {
            $blogIndex = $entry;
            $lastModified = $entry->getElementsByTagName('lastmod')->item(0);
            if ($lastModified) {
                $entry->removeChild($lastModified);
            }
        } elseif (str_starts_with($loc, BLOG_ORIGIN . '/blog/')) {
            $xml->documentElement->removeChild($entry);
        }
    }
    foreach ($posts as $post) {
        $loc = BLOG_ORIGIN . '/blog/' . $post['slug'] . '/';
        $modified = blogDate($post['updatedAt']) ?? blogDate($post['publishedAt']);
        if ($modified && ($latest === null || $modified > $latest)) {
            $latest = $modified;
        }
        if (canonicalBlogUrl($post) !== $loc) {
            continue;
        }
        $entry = $xml->createElementNS($namespace, 'url');
        $entry->appendChild($xml->createElementNS($namespace, 'loc', $loc));
        if ($modified) {
            $entry->appendChild($xml->createElementNS($namespace, 'lastmod', $modified->format(DATE_ATOM)));
        }
        $xml->documentElement->appendChild($entry);
    }
    if ($blogIndex && $latest) {
        $blogIndex->insertBefore(
            $xml->createElementNS($namespace, 'lastmod', $latest->format(DATE_ATOM)),
            $blogIndex->getElementsByTagName('loc')->item(0)->nextSibling
        );
    }
    return $xml->saveXML();
}

try {
    $path = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    header('Cache-Control: no-store');
    $sitemap = $path === '/sitemap.xml';
    if (!$sitemap && (!is_string($path) || !preg_match('~^/blog/(' . BLOG_SLUG . ')/$~D', $path, $match))) {
        http_response_code(404);
        readfile(__DIR__ . '/404.html');
        return;
    }
    $config = require dirname(__DIR__) . '/my-exclusive-rentals-blog.php';
    if ($sitemap) {
        $xml = renderSitemap(file_get_contents(__DIR__ . '/sitemap.xml'), publishedPosts($config));
        header('Content-Type: application/xml; charset=utf-8');
        echo $xml;
        return;
    }

    $slug = $match[1];
    $post = publishedPosts($config, $slug)[$slug] ?? null;
    header('Content-Type: text/html; charset=utf-8');
    if ($post === null) {
        http_response_code(404);
        readfile(__DIR__ . '/404.html');
        return;
    }
    echo renderArticle(file_get_contents(__DIR__ . '/blog/__article/index.html'), $post);
} catch (Throwable $error) {
    error_log('My Exclusive Rentals blog: ' . $error->getMessage());
    http_response_code(503);
    header('Retry-After: 60');
    header('Content-Type: text/plain; charset=utf-8');
    echo 'The blog is temporarily unavailable. Please try again shortly.';
}
