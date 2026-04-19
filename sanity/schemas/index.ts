import type { SchemaTypeDefinition } from "sanity";

import { articleCalloutGridType } from "./articleCalloutGrid";
import { articleCodeType } from "./articleCode";
import { galleryItemType } from "./galleryItem";
import { postType } from "./post";
import { projectType } from "./project";
import { siteSettingsType } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettingsType,
  articleCodeType,
  articleCalloutGridType,
  postType,
  projectType,
  galleryItemType,
];
