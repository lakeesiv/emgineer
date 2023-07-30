import { notFound } from "next/navigation";
import { mediaMapInterface, NotionPageBody } from "notion-on-next";
import React from "react";
import _mediaMap from "public/notion-media/media-map.json";
import { ProgrammingPageObjectResponse } from "types/notion-on-next.types";
import { cachedGetParsedPages, cachedGetBlocks } from "lib/utils";
import Image from "next/image";

export const revalidate = 60;

const mediaMap = _mediaMap as mediaMapInterface;

interface PageProps {
  slug: string;
}
const databaseId = "a83071d8-1416-44a9-98cf-45638a583a82";

export default async function BlogPage({
  params,
}: {
  params: PageProps;
}): Promise<React.ReactNode> {
  const { slug } = params;
  // This may seem like a roundabout way to retrieve the page, but getParsedPages is a per-request cached function. You can read more about it here https://beta.nextjs.org/docs/data-fetching/caching#preload-pattern-with-cache
  // The reason why we have to get all of the pages and then filter is because the Notion API can only search for pages via page id and not slug.
  const pages = await cachedGetParsedPages<ProgrammingPageObjectResponse>(
    databaseId
  );
  const page = pages.find((page) => page.slug === slug);
  if (!page) {
    notFound();
  }
  const blocks = await cachedGetBlocks(page.id);

  return (
    <div className="p-8 md:p-12 max-w-[800px] mx-auto">
      <div className="">
        {mediaMap[databaseId]?.[page.id]?.cover && (
          <Image
            src={mediaMap[databaseId]?.[page.id]?.cover}
            alt={page.title || "Blog Post"}
            width={500}
            height={500}
            className="w-full h-[200px] md:h-[500px] object-cover object-center"
          />
        )}

        <div className="mt-4 mb-8">
          <div className="text-3xl  font-bold">{page.title}</div>
          <div className="text-gray-400">
            {new Date(page.created_time).toLocaleDateString()}
          </div>
        </div>
      </div>
      <hr />
      <NotionPageBody
        blocks={blocks}
        pageId={page.id}
        databaseId={databaseId}
        mediaMap={mediaMap}
      />
    </div>
  );
}

export async function generateStaticParams() {
  // This generates routes using the slugs created from getParsedPages
  const pages = await cachedGetParsedPages<ProgrammingPageObjectResponse>(
    databaseId
  );
  return pages.map((page) => ({
    slug: page.slug,
  }));
}
