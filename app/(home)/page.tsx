import { Suspense } from "react";
import { AnimatedDescription, AnimatedTitle } from "components/text";
import { getBlogPages, getParsedEventPages } from "app/get";
import { EventCard } from "app/events/_components/event-card";
import { Skeleton } from "components/ui/skeleton";
import EventSignUpStatus from "app/events/_components/event-sign-up-status";
import { BlogCard } from "components/blog-card";
// import BlogSection, { BlogSectionLoading } from "./blog-section";
// import EventSection, { EventSectionLoading } from "./event-section";

export const revalidate = 64200;
// export const runtime = "edge";

export default async function Home() {
  const eventPages = await getParsedEventPages(true);
  const blogPages = await getBlogPages(4);

  return (
    <>
      <section className="flex flex-col items-center justify-center p-12">
        <AnimatedTitle>Emgineers</AnimatedTitle>
        <AnimatedDescription>
          Emmanuel College Engineering Society
        </AnimatedDescription>
      </section>
      <>
        {eventPages.length > 0 && (
          <section className="p-8 md:px-24">
            <h2 className="text-3xl font-extrabold text-emma-primary sm:text-center md:text-left">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {eventPages.reverse().map((page) => (
                <EventCard page={page} key={page.parsed.eventId}>
                  <Suspense
                    fallback={<Skeleton className="w-full p-5 mt-4"></Skeleton>}
                  >
                    <EventSignUpStatus
                      eventId={page.parsed.eventId}
                      slug={page.parsed.eventId}
                    />
                  </Suspense>
                </EventCard>
              ))}
            </div>
          </section>
        )}
      </>
      <section className="p-8 md:px-24">
        <h2 className="text-3xl font-extrabold text-emma-primary sm:text-center md:text-left">
          Our Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {blogPages.map((page) => (
            <BlogCard key={page.id} page={page} />
          ))}
        </div>
      </section>
    </>
  );
}
