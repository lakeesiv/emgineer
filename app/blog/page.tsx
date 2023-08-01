import { BlogCard } from "components/blog-card";
import { getBlogPages } from "../get";

export const revalidate = 60;

export default async function ProgrammingBlog() {
  const pages = await getBlogPages();

  return (
    <div>
      <h1 className="text-center font-extrabold text-emma-text text-3xl m-4">
        Blog Posts
      </h1>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        {pages.map((page) => (
          <BlogCard page={page} key={page.id} />
        ))}
      </div>
    </div>
  );
}
