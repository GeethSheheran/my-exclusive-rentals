import { cache } from "react";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore/lite";
import { getFirebaseDb } from "@/lib/firebase";

export interface BlogPost {
  id: string;
  siteId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  author: string;
  category: string;
  tags: string[];
  status: "published";
  featured: boolean;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  createdAt: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
}

function getBlogSiteId(): string {
  const siteId = (
    process.env.BLOG_SITE_ID ?? process.env.NEXT_PUBLIC_BLOG_SITE_ID
  )?.trim();

  if (!siteId) {
    throw new Error("Blog configuration is missing: BLOG_SITE_ID (or NEXT_PUBLIC_BLOG_SITE_ID)");
  }

  return siteId;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function convertFirestoreTimestamp(value: unknown): string | null {
  if (!value) return null;

  try {
    const date =
      value instanceof Timestamp
        ? value.toDate()
        : value instanceof Date
          ? value
          : typeof value === "object" &&
              value !== null &&
              "toDate" in value &&
              typeof value.toDate === "function"
            ? value.toDate()
            : typeof value === "string" || typeof value === "number"
              ? new Date(value)
              : null;

    return date && !Number.isNaN(date.getTime()) ? date.toISOString() : null;
  } catch {
    return null;
  }
}

export function formatBlogDate(value: unknown): string {
  const isoDate = convertFirestoreTimestamp(value);
  if (!isoDate) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

function mapBlogPost(
  document: QueryDocumentSnapshot<DocumentData>,
): BlogPost {
  const data = document.data();

  return {
    id: document.id,
    siteId: asString(data.siteId),
    title: asString(data.title) || "Untitled story",
    slug: asString(data.slug),
    excerpt: asString(data.excerpt),
    content: asString(data.content),
    imageUrl: asString(data.imageUrl),
    imageAlt: asString(data.imageAlt),
    author: asString(data.author),
    category: asString(data.category),
    tags: Array.isArray(data.tags)
      ? data.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    status: "published",
    featured: data.featured === true,
    seoTitle: asString(data.seoTitle),
    metaDescription: asString(data.metaDescription),
    canonicalUrl: asString(data.canonicalUrl),
    createdAt: convertFirestoreTimestamp(data.createdAt),
    updatedAt: convertFirestoreTimestamp(data.updatedAt),
    publishedAt: convertFirestoreTimestamp(data.publishedAt),
  };
}

// React cache deduplicates metadata/page reads within a request only. Firestore
// Lite always reads the server, so publish/edit/unpublish is visible next request.
export const getPublishedPosts = cache(async (): Promise<BlogPost[]> => {
  const siteId = getBlogSiteId();
  const postsQuery = query(
    collection(getFirebaseDb(), "blogPosts"),
    where("siteId", "==", siteId),
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
  );

  const snapshot = await getDocs(postsQuery);
  const posts = snapshot.docs.map(mapBlogPost);
  const slugs = new Set<string>();
  for (const post of posts) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) {
      throw new Error(`Published blog post ${post.id} has an invalid slug: ${post.slug}`);
    }
    if (slugs.has(post.slug)) {
      throw new Error(`Published blog posts share the slug: ${post.slug}`);
    }
    slugs.add(post.slug);
  }
  return posts;
});

export const getPublishedPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  // Read only the requested article, without downloading the whole archive.
  const postQuery = query(
    collection(getFirebaseDb(), "blogPosts"),
    where("siteId", "==", getBlogSiteId()),
    where("status", "==", "published"),
    where("slug", "==", slug),
    limit(2),
  );
  const snapshot = await getDocs(postQuery);
  if (snapshot.size > 1) throw new Error(`Published blog posts share the slug: ${slug}`);
  return snapshot.empty ? null : mapBlogPost(snapshot.docs[0]);
});
