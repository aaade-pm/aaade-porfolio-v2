export const apiVersion = "2024-01-01";

export function getSanityProjectId(): string | undefined {
  return process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
}

export function getSanityDataset(): string | undefined {
  return process.env.NEXT_PUBLIC_SANITY_DATASET;
}

export function isSanityConfigured(): boolean {
  return Boolean(getSanityProjectId() && getSanityDataset());
}
