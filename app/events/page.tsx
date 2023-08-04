import { getParsedEventPages } from "../get";
import { EventCard } from "./_components/event-card";

export const revalidate = 60;

export default async function EventIndex() {
  const pages = await getParsedEventPages();
  const upcomingPages = pages.filter((page) => page.parsed.date > new Date());
  const pastPages = pages.filter((page) => page.parsed.date < new Date());

  return (
    <div>
      <h1 className="text-center font-extrabold text-emma-primary text-3xl m-4">
        Events
      </h1>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        {upcomingPages.map((page) => (
          <>
            <EventCard page={page} />
          </>
        ))}
      </div>
      <h1 className="text-center font-extrabold text-emma-primary text-3xl m-4">
        Past Events
      </h1>
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
