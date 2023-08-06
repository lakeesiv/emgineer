import { BlogCard } from "components/blog-card";
import { getBlogPages } from "../get";

export const revalidate = 600;

export default async function BlogIndex() {
  const pages = await getBlogPages();

  return (
    <div>
      <h1
        className="animate-fade-up bg-gradient-to-br from-emma-primary to-emma-secondary bg-clip-text text-center text-6xl font-extrabold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem] pb-[0.8rem]"
        style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
      >
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
