import { BlogPageObjectResponse } from "types/notion-on-next.types";
import { cachedGetParsedPages } from "../get";
import { ProgrammingPageCard } from "./ProgrammingPageCard";

export const revalidate = 60;

const databaseId = "a83071d8-1416-44a9-98cf-45638a583a82";

export default async function ProgrammingBlog() {
  const pages = await cachedGetParsedPages<BlogPageObjectResponse>(databaseId);
  const sortedPages = sortPages(pages);

  return (
    <div>
      <main className="">
        <h1 className="text-center font-bold text-3xl m-6 md:m-12">
          Blog Posts
        </h1>
        <div className="flex flex-col justify-center gap-8 max-w-[800px] mx-auto p-12">
          {sortedPages.map((page) => (
            <ProgrammingPageCard
              page={page}
              databaseId={databaseId}
              key={page.id}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

const sortPages = (pages: BlogPageObjectResponse[]) => {
  // get all pages with a date
  const datedPages = pages.filter((page) => page.properties.Date.date?.start);
  // sort pages by date descending
  const sortedPages = datedPages.sort((a, b) => {
    const aDate = new Date(a.properties.Date.date?.start as string);
    const bDate = new Date(b.properties.Date.date?.start as string);
    return bDate.getTime() - aDate.getTime();
  });

  return sortedPages;
};
