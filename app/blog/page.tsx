import { getBlogPages } from "../get";
import { BlogPostCard } from "./blog-post-card";

export const revalidate = 60;

const databaseId = "a83071d8-1416-44a9-98cf-45638a583a82";

export default async function ProgrammingBlog() {
  const pages = await getBlogPages();

  return (
    <div>
      <h1 className="text-center font-extrabold text-emma-text text-3xl m-4">
        Blog Posts
      </h1>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        {pages.map((page) => (
          <BlogPostCard page={page} databaseId={databaseId} key={page.id} />
        ))}
      </div>
    </div>
  );
}
