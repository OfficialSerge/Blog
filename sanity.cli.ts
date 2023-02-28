import { defineCliConfig } from "sanity/cli";

// let projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!; // "pv8y60vp"
// let dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!; // "production"

export default defineCliConfig({
  api: {
    projectId: "9dwrxtqr",
    dataset: "production",
  },
});
