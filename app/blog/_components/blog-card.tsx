"use client";

import Link from "next/link";
import Image from "next/image";
import _mediaMap from "public/notion-media/media-map.json";
import { mediaMapInterface } from "notion-on-next/types/types";
import { BlogPageObjectResponse } from "types/notion-on-next.types";
import siteConfig from "site.config";
import dynamic from "next/dynamic";
const mediaMap = _mediaMap as mediaMapInterface;
import { Skeleton } from "../../../components/ui/skeleton";

const BlogDate = dynamic(() => import("./blog-date"), {
  ssr: false,
  loading: () => (
    <Skeleton>
      <span className="text-gray-500 dark:text-slate-400 p-1 m-1 my-3"></span>
    </Skeleton>
  ),
});

export const BlogCard = ({ page }: { page: BlogPageObjectResponse }) => {
  const image = mediaMap[siteConfig.blogDatabaseId]?.[page.id]?.cover;

  return (
    <article className={`grid gap-6 md:gap-8 ${image ? "md:grid-cols-2" : ""}`}>
      {image && (
        <Link className="relative block group" href={`/blog/${page.slug}`}>
          <Image
            alt={page.title || "Cover Image for " + page.id}
            src={image}
            className="max-h-[300px] w-full rounded-md  object-cover object-center"
            width={300}
            height={300}
          />
        </Link>
      )}
      <div>
        <header>
          <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-2 font-heading">
            <Link
              className="text-emma-primary hover:text-emma-secondary underline underline-offset-4 decoration-1 transition ease-in duration-200"
              href={`/blog/${page.slug}`}
            >
              {page.title}
            </Link>
          </h2>
        </header>
        <p className="text-md sm:text-lg flex-grow">
          {/* @ts-ignore -- Notion Team currently has incorrect type for RichTextObjectResponse. The API returns an an array of RichTextObjectResponse inside of RichTextPropertyItemObjectResponse, but the type definition is not aware of that yet  */}
          {page.properties?.Description?.rich_text[0]?.plain_text}
        </p>
        <footer className="mt-4">
          <div>
            <BlogDate date={page.properties.Date.date?.start!} />
          </div>
        </footer>
      </div>
    </article>
  );
};
