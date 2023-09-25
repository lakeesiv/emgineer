"use client";

import { ParsedEventsPageObjectResponse } from "app/get";
import { Skeleton } from "components/ui/skeleton";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { mediaMapInterface } from "notion-on-next/types/types";
import _mediaMap from "public/notion-media/media-map.json";
import siteConfig from "site.config";
// import LocationAndTime from "./location-and-time";
const mediaMap = _mediaMap as mediaMapInterface;

const AddToCal = dynamic(() => import("./add-to-cal"), {
  ssr: false,
  loading: () => (
    <div className="my-[0.35rem]">
      <Skeleton className="w-[2.125rem] h-8 rounded-md ml-2" />
    </div>
  ),
});

const LocationAndTime = dynamic(() => import("./location-and-time"), {
  ssr: false,
  loading: () => (
    <Skeleton>
      <span className="text-gray-500 dark:text-slate-400 p-1 m-1 my-3"></span>
    </Skeleton>
  ),
});

export const EventCard = ({
  page,
  children,
}: {
  page: ParsedEventsPageObjectResponse;
  children?: React.ReactNode;
}) => {
  const image = mediaMap[siteConfig.eventsDatabaseId]?.[page.id]?.cover;

  // @ts-ignore
  const description = page.properties?.Description?.rich_text[0]
    ?.plain_text as string;

  const slug = page.parsed.eventId;

  return (
    <article className={`grid gap-6 md:gap-8 ${image ? "md:grid-cols-2" : ""}`}>
      {image && (
        <Link className="relative block group" href={`/events/${slug}`}>
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
              href={`/events/${slug}`}
            >
              {page.title}
            </Link>
          </h2>
        </header>
        <footer className="mt-4">
          <div className="flex flex-col">
            <LocationAndTime page={page} />
            <div className="flex space-x-4 items-center mt-2">
              <span className="text-gray-500 dark:text-slate-400 mb-1">
                Duration ~ {page.parsed.duration} hrs
              </span>
              <AddToCal
                start={page.parsed.date}
                duration={page.parsed.duration}
                name={page.title as string}
                description={description}
                location={page.parsed.location}
              />
            </div>
            {page.parsed.date > new Date() && children && <>{children}</>}
          </div>
        </footer>
      </div>
    </article>
  );
};
