import type { SchemaTypeDefinition } from "sanity";

import { galleryItemType } from "./galleryItem";
import { postType } from "./post";
import { projectType } from "./project";
import { siteSettingsType } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettingsType,
  postType,
  projectType,
  galleryItemType,
];
