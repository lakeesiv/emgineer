import Image from "next/image";
import { notFound } from "next/navigation";
import { mediaMapInterface, NotionPageBody } from "lib/non";
import _mediaMap from "public/notion-media/media-map.json";
import React from "react";
import siteConfig from "site.config";
import { cachedGetBlocks, getEventPages, getParsedEventPages } from "app/get";
import RegisterForm from "../_components/register-form";
import { Metadata } from "next";
import { getMetaData } from "lib/meta";

export const runtime = "nodejs";
export const revalidate = 86400;

const mediaMap = _mediaMap as mediaMapInterface;
const databaseId = siteConfig.eventsDatabaseId;

interface PageProps {
  slug: string;
}

const formatDate = (date: Date) => {
  const days = date.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // time: HH:MM AM/PM
  const time = date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${time}, ${days}`;
};

export async function generateMetadata({
  params,
}: {
  params: PageProps;
}): Promise<Metadata> {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug).replace(" ", "-");
  const pages = await getParsedEventPages();

  const page = pages.find((page) => page.parsed.eventId === decodedSlug);
  if (!page) {
    notFound();
  }

  return getMetaData({
    title: page.parsed.title,
    description: `${formatDate(page.parsed.date)} @ ${page.parsed.location}`,
  });
}

export default async function EventPage({ params }: { params: PageProps }) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug).replace(" ", "-");
  const pages = await getParsedEventPages();

  const page = pages.find((page) => page.parsed.eventId === decodedSlug);
  if (!page) {
    notFound();
  }
  const blocks = await cachedGetBlocks(page.id);
  const image = mediaMap[databaseId]?.[page.id]?.cover;

  return (
    <div className="p-8 md:p-12 max-w-[800px] mx-auto">
      <div className="mb-5">
        {image && (
          <Image
            src={image}
            alt={page.title || "Blog Post"}
            width={500}
            height={500}
            className="w-full h-[200px] md:h-[400px] rounded-md object-cover object-center"
          />
        )}

        <div className="mt-4">
          <div className="text-3xl font-extrabold text-emma-primary hover:text-emma-secondary transition ease-in duration-200 mb-2">
            {page.title}
          </div>

          <div className="flex flex-col">
            <span className="text-gray-500 dark:text-slate-400">
              {formatDate(page.parsed.date)} @ {page.parsed.location}
            </span>
            <div className="flex space-x-4 items-center mt-2">
              <span className="text-gray-500 dark:text-slate-400 mb-1">
                Duration ~ {page.parsed.duration} hrs
              </span>
            </div>
          </div>
        </div>
      </div>
      <NotionPageBody
        blocks={blocks}
        pageId={page.id}
        databaseId={databaseId}
        mediaMap={mediaMap}
      />
      {page.parsed.date > new Date() && <RegisterForm {...page} />}
    </div>
  );
}

export async function generateStaticParams() {
  // This generates routes using the slugs created from getParsedPages
  const pages = await getParsedEventPages();
  return pages.map((page) => ({
    slug: page.parsed.eventId,
  }));
}
