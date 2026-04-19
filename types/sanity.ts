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
  excerpt: string | null;
  readingTimeMinutes: number | null;
  coverImage: SanityImage | null;
  /** Set by `getPosts()` for listing cards (Next/Image). */
  coverUrl: string | null;
};

/** Post body may include custom portable text object blocks from Sanity. */
export type PostDetail = PostListItem & {
  titleAccent: string | null;
  coverCaption: string | null;
  authorName: string | null;
  authorRole: string | null;
  authorImage: SanityImage | null;
  authorImageUrl: string | null;
  tags: string[] | null;
  content: PortableTextBlock[] | null;
};

export type ProjectApproachStep = {
  title: string;
  body: string | null;
};

export type ProjectOutcomeStat = {
  value: string;
  label: string;
  description: string | null;
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
  titleAccent: string | null;
  caseStudyEyebrow: string | null;
  role: string | null;
  context: string | null;
  timeline: string | null;
  stackSummary: string | null;
  challengeTitle: string | null;
  overview: string | null;
  problem: string | null;
  approachSteps: ProjectApproachStep[] | null;
  outcomes: ProjectOutcomeStat[] | null;
  lessons: string[] | null;
  lessonsAttribution: string | null;
  lessonsAttributionRole: string | null;
  caseStudy: PortableTextBlock[] | null;
};

export type GalleryItem = {
  _id: string;
  image: SanityImage | null;
  caption: string | null;
  captionTitle: string | null;
  captionDescription: string | null;
  /** From image asset metadata for masonry aspect ratio */
  assetWidth: number | null;
  assetHeight: number | null;
};
