import { getBlogPages } from "app/get";
import { BlogCard } from "components/blog-card";
import { Skeleton } from "components/ui/skeleton";
import React from "react";

export const revalidate = 86400;

const BlogSection = async () => {
  const pages = await getBlogPages(4);

  return (
    <section className="p-8 md:px-24">
      <h2 className="text-3xl font-extrabold text-emma-primary sm:text-center md:text-left">
        Our Blog
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {pages.map((page) => (
          <BlogCard key={page.id} page={page} />
        ))}
      </div>
    </section>
  );
};

export const BlogSectionLoading = () => (
  <section className="p-8 md:px-24">
    <h2 className="text-3xl font-extrabold text-emma-primary sm:text-center md:text-left">
      Our Blog
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
      <Skeleton className="h-48" />
    </div>
  </section>
);

export default BlogSection;
