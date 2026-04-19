import imageUrlBuilder from "@sanity/image-url";
import { createClient, groq } from "next-sanity";
import { cache } from "react";

import {
  DEFAULT_SITE_SETTINGS,
  mergeSiteSettings,
} from "@/lib/site-settings-defaults";
import { estimateReadingMinutesFromPortableText } from "@/lib/reading-time";
import {
  apiVersion,
  getSanityDataset,
  getSanityProjectId,
  isSanityConfigured,
} from "@/sanity/config/client";
import type { SiteSettingsResolved } from "@/types/site-settings";
import type { PortableTextBlock } from "@portabletext/types";

import type {
  GalleryItem,
  PostDetail,
  PostListItem,
  ProjectDetail,
  ProjectListItem,
  SanityImage,
} from "@/types/sanity";

const fetchOptions = { next: { revalidate: 60 } } as const;

function getClient() {
  const projectId = getSanityProjectId();
  const dataset = getSanityDataset();
  if (!projectId || !dataset) {
    throw new Error("Sanity is not configured");
  }
  return createClient({ projectId, dataset, apiVersion, useCdn: true });
}

export function urlForImage(source: SanityImage | null | undefined) {
  if (!source || !isSanityConfigured()) return null;
  return imageUrlBuilder(getClient()).image(source);
}

const postsQuery = groq`*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  category,
  excerpt,
  coverImage,
  content
}`;

const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  titleAccent,
  "slug": slug.current,
  publishedAt,
  category,
  excerpt,
  coverCaption,
  coverImage,
  authorName,
  authorRole,
  authorImage,
  tags,
  content
}`;

const relatedPostsQuery = groq`*[_type == "post" && _id != $id] | order(publishedAt desc) [0...15] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  category,
  excerpt,
  coverImage,
  content
}`;

const projectCardProjection = `{
  _id,
  title,
  "slug": slug.current,
  description,
  techStack,
  images,
  githubUrl,
  liveUrl,
  category,
  year
}`;

const projectsQuery = groq`*[_type == "project"] | order(_createdAt desc) ${projectCardProjection}`;

const featuredProjectsQuery =
  groq`*[_type == "project" && featured == true] | order(_createdAt desc) ${projectCardProjection}`;

const archivedProjectsQuery =
  groq`*[_type == "project" && archived == true] | order(year desc, _createdAt desc) ${projectCardProjection}`;

const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  titleAccent,
  caseStudyEyebrow,
  "slug": slug.current,
  description,
  techStack,
  images,
  githubUrl,
  liveUrl,
  category,
  year,
  role,
  context,
  timeline,
  stackSummary,
  challengeTitle,
  overview,
  problem,
  approachSteps[] {
    title,
    body
  },
  outcomes[] {
    value,
    label,
    description
  },
  lessons,
  lessonsAttribution,
  lessonsAttributionRole,
  caseStudy
}`;

const projectSlugsOrderedQuery =
  groq`*[_type == "project"] | order(year desc, _createdAt desc) {
    "slug": slug.current,
    title
  }`;

const galleryItemProjection = `{
  _id,
  image,
  caption,
  captionTitle,
  captionDescription,
  "assetWidth": image.asset->metadata.dimensions.width,
  "assetHeight": image.asset->metadata.dimensions.height
}`;

const galleryQuery =
  groq`*[_type == "galleryItem"] | order(_createdAt desc) ${galleryItemProjection}`;

const lifeGalleryPreviewQuery = groq`*[_type == "siteSettings"] | order(_updatedAt desc)[0] {
  "curated": lifeGalleryItems[]-> ${galleryItemProjection}
}.curated`;

/** Single site settings doc; `_id` may be a UUID (not `siteSettings`). */
const siteSettingsQuery =
  groq`*[_type == "siteSettings"] | order(_updatedAt desc)[0]`;

type PostListRaw = Omit<PostListItem, "coverUrl" | "readingTimeMinutes"> & {
  content: PortableTextBlock[] | null;
};

type PostDetailRaw = Omit<
  PostDetail,
  "coverUrl" | "readingTimeMinutes" | "authorImageUrl"
> & {
  content: PortableTextBlock[] | null;
};

export async function getPosts(): Promise<PostListItem[]> {
  if (!isSanityConfigured()) return [];
  const raw = await getClient().fetch<PostListRaw[]>(postsQuery, {}, fetchOptions);
  return raw.map((post) => {
    const { content, ...rest } = post;
    return {
      ...rest,
      excerpt: post.excerpt ?? null,
      readingTimeMinutes: estimateReadingMinutesFromPortableText(content),
      coverUrl: post.coverImage
        ? (urlForImage(post.coverImage)?.width(800).height(600).url() ?? null)
        : null,
    };
  });
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  if (!isSanityConfigured()) return null;
  const post = await getClient().fetch<PostDetailRaw | null>(
    postBySlugQuery,
    { slug },
    fetchOptions,
  );
  if (!post) return null;
  const { content, ...rest } = post;
  return {
    ...rest,
    content: content as PostDetail["content"],
    titleAccent: post.titleAccent ?? null,
    coverCaption: post.coverCaption ?? null,
    authorName: post.authorName ?? null,
    authorRole: post.authorRole ?? null,
    authorImage: post.authorImage ?? null,
    tags: post.tags ?? null,
    excerpt: post.excerpt ?? null,
    readingTimeMinutes: estimateReadingMinutesFromPortableText(content),
    coverUrl: post.coverImage
      ? (urlForImage(post.coverImage)?.width(1600).height(900).url() ?? null)
      : null,
    authorImageUrl: post.authorImage
      ? (urlForImage(post.authorImage)?.width(128).height(128).url() ?? null)
      : null,
  };
}

export async function getRelatedPosts(
  excludeId: string,
  category: string | null,
  limit: number,
): Promise<PostListItem[]> {
  if (!isSanityConfigured()) return [];
  const raw = await getClient().fetch<PostListRaw[]>(
    relatedPostsQuery,
    { id: excludeId },
    fetchOptions,
  );
  const withMeta = raw.map((post) => {
    const { content, ...rest } = post;
    return {
      ...rest,
      excerpt: post.excerpt ?? null,
      readingTimeMinutes: estimateReadingMinutesFromPortableText(content),
      coverUrl: post.coverImage
        ? (urlForImage(post.coverImage)?.width(800).height(600).url() ?? null)
        : null,
    };
  });
  const sorted = [...withMeta].sort((a, b) => {
    const aMatch = category ? (a.category === category ? 1 : 0) : 0;
    const bMatch = category ? (b.category === category ? 1 : 0) : 0;
    if (aMatch !== bMatch) return bMatch - aMatch;
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });
  return sorted.slice(0, limit);
}

export async function getProjects(): Promise<ProjectListItem[]> {
  if (!isSanityConfigured()) return [];
  return getClient().fetch(projectsQuery, {}, fetchOptions);
}

export async function getFeaturedProjects(): Promise<ProjectListItem[]> {
  if (!isSanityConfigured()) return [];
  return getClient().fetch(featuredProjectsQuery, {}, fetchOptions);
}

export const getArchivedProjects = cache(
  async (): Promise<ProjectListItem[]> => {
    if (!isSanityConfigured()) return [];
    return getClient().fetch(archivedProjectsQuery, {}, fetchOptions);
  },
);

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDetail | null> {
  if (!isSanityConfigured()) return null;
  const project = await getClient().fetch<ProjectDetail | null>(
    projectBySlugQuery,
    { slug },
    fetchOptions,
  );
  if (!project) return null;
  return {
    ...project,
    titleAccent: project.titleAccent ?? null,
    caseStudyEyebrow: project.caseStudyEyebrow ?? null,
    role: project.role ?? null,
    context: project.context ?? null,
    timeline: project.timeline ?? null,
    stackSummary: project.stackSummary ?? null,
    challengeTitle: project.challengeTitle ?? null,
    overview: project.overview ?? null,
    problem: project.problem ?? null,
    approachSteps: project.approachSteps ?? null,
    outcomes: project.outcomes ?? null,
    lessons: project.lessons ?? null,
    lessonsAttribution: project.lessonsAttribution ?? null,
    lessonsAttributionRole: project.lessonsAttributionRole ?? null,
  };
}

export async function getNextProjectBySlug(
  currentSlug: string,
): Promise<{ slug: string; title: string } | null> {
  if (!isSanityConfigured()) return null;
  const rows = await getClient().fetch<{ slug: string; title: string }[]>(
    projectSlugsOrderedQuery,
    {},
    fetchOptions,
  );
  const i = rows.findIndex((r) => r.slug === currentSlug);
  if (i === -1 || i >= rows.length - 1) return null;
  return rows[i + 1] ?? null;
}

function normalizeGalleryItems(raw: GalleryItem[]): GalleryItem[] {
  return raw
    .filter((item) => item != null && item._id)
    .map((item) => ({
      ...item,
      caption: item.caption ?? null,
      captionTitle: item.captionTitle ?? null,
      captionDescription: item.captionDescription ?? null,
      assetWidth: item.assetWidth ?? null,
      assetHeight: item.assetHeight ?? null,
    }))
    .filter((item) => item.image != null);
}

export async function getGalleryImages(): Promise<GalleryItem[]> {
  if (!isSanityConfigured()) return [];
  const raw = await getClient().fetch<GalleryItem[]>(
    galleryQuery,
    {},
    fetchOptions,
  );
  return normalizeGalleryItems(raw);
}

/**
 * Items for the Beyond code section on home and /life.
 * Uses Site settings → Beyond code → “photos to show” when set; otherwise all gallery items (newest first).
 */
export async function getLifeGalleryPreview(): Promise<GalleryItem[]> {
  if (!isSanityConfigured()) return [];
  const curated = await getClient().fetch<GalleryItem[] | null>(
    lifeGalleryPreviewQuery,
    {},
    fetchOptions,
  );
  const normalized = normalizeGalleryItems(curated ?? []);
  if (normalized.length > 0) {
    return normalized;
  }
  return getGalleryImages();
}

export const getSiteSettings = cache(
  async (): Promise<SiteSettingsResolved> => {
    if (!isSanityConfigured()) {
      return DEFAULT_SITE_SETTINGS;
    }
    const raw = await getClient().fetch(siteSettingsQuery, {}, fetchOptions);
    const merged = mergeSiteSettings(raw, DEFAULT_SITE_SETTINGS);
    const logoUrl = merged.logo
      ? (urlForImage(merged.logo)?.width(160).height(160).url() ?? null)
      : null;
    return { ...merged, logoUrl };
  },
);
