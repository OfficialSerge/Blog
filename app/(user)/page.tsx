import { previewData } from "next/headers";
import { groq } from "next-sanity";
import { client } from "lib/sanity.client";

import PreviewSuspense from "@/components/PreviewSuspense";
import PreviewBlogList from "@/components/PreviewBlogList";

// content for home page
import BlogLayout from "@/components/BlogLayout";

// framer motion wrapper
import FramerMotionWrapper from "@/components/FramerMotionWrapper";

const QUERY = groq`
*[_type == 'post' && !references(categories, *[title == 'about']._id)] {
  ...,
  author->,
  categories[]->,
} | order(_createdAt desc)
`;

export default async function Home() {
  // There's a weird error I keep getting when
  // I try using preview, ignored for now.
  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={
          <div role="status">
            <p className="text-center text-lg animate-pulse text-white">
              Loading Preview Data
            </p>
          </div>
        }
      >
        <PreviewBlogList query={QUERY} />
      </PreviewSuspense>
    );
  }

  // Just go straight to client
  const posts = await client.fetch(QUERY);

  return (
    <FramerMotionWrapper>
      <BlogLayout posts={posts} />
    </FramerMotionWrapper>
  );
}
