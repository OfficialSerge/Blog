import { definePreview } from "next-sanity/preview";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!; // "pv8y60vp"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!; // "production"

function onPublicAccessOnly() {
  throw new Error(`Unable to load preview as you're not logged in`);
}

if (!projectId || !dataset) {
  throw new Error("Missing projectID or dataset. Check sanity.json or .env");
}

export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly,
});
