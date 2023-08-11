import { AnimatedTitle } from "components/text";
import { getParsedEventPages } from "../get";
import { EventCard } from "./_components/event-card";
import EventSignUpStatus from "./_components/event-sign-up-status";
import { Suspense } from "react";
import { Skeleton } from "components/ui/skeleton";

export const revalidate = 64200;

export default async function EventIndex() {
  const pages = await getParsedEventPages();
  const upcomingPages = pages.filter((page) => page.parsed.date > new Date());
  const pastPages = pages.filter((page) => page.parsed.date < new Date());

  return (
    <div>
      <AnimatedTitle variant="h3" size="sm" className="mt-4">
        Upcoming Events
      </AnimatedTitle>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        {upcomingPages.map((page) => (
          <>
            <EventCard page={page}>
              <Suspense
                fallback={<Skeleton className="w-full p-5 mt-4"></Skeleton>}
              >
                <EventSignUpStatus
                  eventId={page.parsed.eventId}
                  slug={page.parsed.eventId}
                />
              </Suspense>
            </EventCard>
          </>
        ))}
      </div>
      <AnimatedTitle variant="h3" size="sm">
        Past Events
      </AnimatedTitle>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        {pastPages.map((page) => (
          <>
            <EventCard page={page} />
          </>
        ))}
      </div>
    </div>
  );
}
