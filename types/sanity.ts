import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  _type?: "image";
  asset?: { _ref: string; _type?: "reference" };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category: string | null;
  coverImage: SanityImage | null;
};

export type PostDetail = PostListItem & {
  content: PortableTextBlock[] | null;
};

export type ProjectListItem = {
  _id: string;
  title: string;
  slug: string;
  description: string | null;
  techStack: string[] | null;
  images: SanityImage[] | null;
  githubUrl: string | null;
  liveUrl: string | null;
  category: string | null;
  year: number | null;
};

export type ProjectDetail = ProjectListItem & {
  caseStudy: PortableTextBlock[] | null;
};

export type GalleryItem = {
  _id: string;
  image: SanityImage | null;
  caption: string | null;
};
