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
} from "firebase/firestore";
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
  const siteId = process.env.BLOG_SITE_ID?.trim();

  if (!siteId) {
    throw new Error("Blog configuration is missing: BLOG_SITE_ID");
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

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const siteId = getBlogSiteId();
  const postsQuery = query(
    collection(getFirebaseDb(), "blogPosts"),
    where("siteId", "==", siteId),
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
  );

  const snapshot = await getDocs(postsQuery);
  return snapshot.docs.map(mapBlogPost).filter((post) => post.slug);
}

export async function getPublishedPostBySlug(
  requestedSlug: string,
): Promise<BlogPost | null> {
  const siteId = getBlogSiteId();
  const slug = requestedSlug.trim();
  if (!slug) return null;

  const postQuery = query(
    collection(getFirebaseDb(), "blogPosts"),
    where("siteId", "==", siteId),
    where("status", "==", "published"),
    where("slug", "==", slug),
    limit(1),
  );

  const snapshot = await getDocs(postQuery);
  return snapshot.empty ? null : mapBlogPost(snapshot.docs[0]);
}

export function getBlogErrorMessage(error: unknown): string {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String(error.code)
      : "";
  const message = error instanceof Error ? error.message : "";

  if (message.includes("configuration is missing")) return message;
  if (code.includes("permission-denied")) {
    return "The blog is temporarily unavailable because Firestore denied access.";
  }
  if (code.includes("failed-precondition") || message.includes("index")) {
    return "The blog requires a Firestore index before posts can be displayed.";
  }

  return "The blog could not be loaded right now. Please try again shortly.";
}
