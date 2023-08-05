import { EventCard } from "app/events/_components/event-card";
import { getParsedEventPages } from "app/get";
import { revalidatePath } from "next/cache";

const EventSection = async () => {
  const pages = await getParsedEventPages(true);
  revalidatePath("/events");

  return (
    <>
      {pages.length > 0 && (
        <section className="p-8 md:px-24">
          <h2 className="text-3xl font-extrabold text-emma-primary sm:text-center md:text-left">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {pages.reverse().map((page) => (
              <EventCard key={page.id} page={page} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default EventSection;