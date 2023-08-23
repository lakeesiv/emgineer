import { BlogCard } from "app/blog/_components/blog-card";
import { getBlogPages } from "../get";
import { Title } from "components/text";

export const runtime = "nodejs";
export const revalidate = 86400;

export default async function BlogIndex() {
  const pages = await getBlogPages();

  return (
    <div>
      <Title variant="h3" size="sm">
        Blog Posts
      </Title>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        {pages.map((page) => (
          <BlogCard page={page} key={page.id} />
        ))}
      </div>
    </div>
  );
}
