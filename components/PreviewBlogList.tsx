"use client";

import { usePreview } from "lib/sanity.preview";
import BlogLayout from "./BlogLayout";

type Props = {
  query: string;
};

export default function PreviewBlogList({ query }: Props) {
  const posts = usePreview(null, query);
  return <BlogLayout posts={posts} />
}
