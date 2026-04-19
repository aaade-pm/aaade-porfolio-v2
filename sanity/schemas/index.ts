import type { SchemaTypeDefinition } from "sanity";

import { galleryItemType } from "./galleryItem";
import { postType } from "./post";
import { projectType } from "./project";

export const schemaTypes: SchemaTypeDefinition[] = [
  postType,
  projectType,
  galleryItemType,
];
