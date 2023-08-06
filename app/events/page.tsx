import { getParsedEventPages } from "../get";
import { EventCard } from "./_components/event-card";

export const revalidate = 60;

export default async function EventIndex() {
  const pages = await getParsedEventPages();
  const upcomingPages = pages.filter((page) => page.parsed.date > new Date());
  const pastPages = pages.filter((page) => page.parsed.date < new Date());

  return (
    <div>
      <h1
        className="animate-fade-up bg-gradient-to-br from-emma-primary to-emma-secondary bg-clip-text text-center text-6xl font-extrabold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem] pb-[0.8rem]"
        style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
      >
        Events
      </h1>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        {upcomingPages.map((page) => (
          <>
            <EventCard page={page} />
          </>
        ))}
      </div>
      <h1
        className="animate-fade-up bg-gradient-to-br from-emma-primary to-emma-secondary bg-clip-text text-center text-6xl font-extrabold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem] pb-[0.8rem]"
        style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
      >
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
