import { getEventPages, getParsedEventPages } from "../get";

export const revalidate = 60;

export default async function EventIndex() {
  const pages = await getParsedEventPages();

  return (
    <div>
      <h1 className="text-center font-extrabold text-emma-text text-3xl m-4">
        Event Posts
      </h1>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        {pages.map((page) => (
          <span
            key={page.id}
            className="pre-wrap whitespace-pre-wrap break-words font-mono"
          >
            {JSON.stringify(page.parsed, null, 2)}
          </span>
        ))}
      </div>
    </div>
  );
}
