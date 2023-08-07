import { AnimatedTitle } from "components/text";
import { getParsedEventPages } from "../get";
import { EventCard } from "./_components/event-card";

export const revalidate = 60;

export default async function EventIndex() {
  const pages = await getParsedEventPages();
  const upcomingPages = pages.filter((page) => page.parsed.date > new Date());
  const pastPages = pages.filter((page) => page.parsed.date < new Date());

  return (
    <div>
      <AnimatedTitle variant="h3" size="sm">
        Upcoming Events
      </AnimatedTitle>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        {upcomingPages.map((page) => (
          <>
            <EventCard page={page} />
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
