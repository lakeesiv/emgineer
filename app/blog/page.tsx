import { BlogCard } from "components/blog-card";
import { getBlogPages } from "../get";
import { AnimatedTitle } from "components/text";

export const revalidate = 600;

export default async function BlogIndex() {
  const pages = await getBlogPages();

  return (
    <div>
      <AnimatedTitle variant="h3" size="sm">
        Blog Posts
      </AnimatedTitle>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        {pages.map((page) => (
          <BlogCard page={page} key={page.id} />
        ))}
      </div>
    </div>
  );
}
