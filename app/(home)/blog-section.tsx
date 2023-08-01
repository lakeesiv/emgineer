import { getBlogPages } from "app/get";
import { BlogCard } from "components/blog-card";
import React from "react";

const BlogSection = async () => {
  const pages = await getBlogPages(4);

  return (
    <section className="p-8 md:px-24">
      <h2 className="text-3xl font-extrabold text-emma-text sm:text-center md:text-left">
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

export default BlogSection;
