import imageUrlBuilder from "@sanity/image-url";
import { createClient, groq } from "next-sanity";
import { cache } from "react";

import {
  DEFAULT_SITE_SETTINGS,
  mergeSiteSettings,
} from "@/lib/site-settings-defaults";
import {
  apiVersion,
  getSanityDataset,
  getSanityProjectId,
  isSanityConfigured,
} from "@/sanity/config/client";
import type { SiteSettingsResolved } from "@/types/site-settings";
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
  coverImage
}`;

const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  category,
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
  "slug": slug.current,
  description,
  techStack,
  images,
  githubUrl,
  liveUrl,
  category,
  year,
  caseStudy
}`;

const galleryQuery = groq`*[_type == "galleryItem"] | order(_createdAt desc) {
  _id,
  image,
  caption
}`;

/** Single site settings doc; `_id` may be a UUID (not `siteSettings`). */
const siteSettingsQuery =
  groq`*[_type == "siteSettings"] | order(_updatedAt desc)[0]`;

export async function getPosts(): Promise<PostListItem[]> {
  if (!isSanityConfigured()) return [];
  return getClient().fetch(postsQuery, {}, fetchOptions);
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  if (!isSanityConfigured()) return null;
  return getClient().fetch(postBySlugQuery, { slug }, fetchOptions);
}

export async function getProjects(): Promise<ProjectListItem[]> {
  if (!isSanityConfigured()) return [];
  return getClient().fetch(projectsQuery, {}, fetchOptions);
}

export async function getFeaturedProjects(): Promise<ProjectListItem[]> {
  if (!isSanityConfigured()) return [];
  return getClient().fetch(featuredProjectsQuery, {}, fetchOptions);
}

export async function getArchivedProjects(): Promise<ProjectListItem[]> {
  if (!isSanityConfigured()) return [];
  return getClient().fetch(archivedProjectsQuery, {}, fetchOptions);
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDetail | null> {
  if (!isSanityConfigured()) return null;
  return getClient().fetch(projectBySlugQuery, { slug }, fetchOptions);
}

export async function getGalleryImages(): Promise<GalleryItem[]> {
  if (!isSanityConfigured()) return [];
  return getClient().fetch(galleryQuery, {}, fetchOptions);
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
