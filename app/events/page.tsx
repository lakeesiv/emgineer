import { getEventPages, getParsedEventPages } from "../get";
import { EventCard } from "./event-card";

export const revalidate = 60;

export default async function EventIndex() {
  const pages = await getParsedEventPages();

  return (
    <div>
      <h1 className="text-center font-extrabold text-emma-text text-3xl m-4">
        Events
      </h1>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        {pages.map((page) => (
          <>
            <EventCard page={page} />
            {/* <span className="pre-wrap whitespace-pre-wrap break-words font-mono">
              {JSON.stringify(page.parsed, null, 2)}
            </span> */}
          </>
        ))}
      </div>
    </div>
  );
}
