import { Button } from "components/ui/button";
import { ProgrammingPageObjectResponse } from "types/notion-on-next.types";
import { cachedGetParsedPages } from "lib/utils";
import { ProgrammingPageCard } from "./ProgrammingPageCard";

export const revalidate = 60;

const databaseId = "a83071d8-1416-44a9-98cf-45638a583a82";

export default async function ProgrammingBlog() {
  const pages = await cachedGetParsedPages<ProgrammingPageObjectResponse>(
    databaseId
  );
  return (
    <div>
      <main className="">
        <h1 className="text-center font-bold text-3xl m-6 md:m-12">
          Blog Posts
        </h1>
        <Button>Well</Button>
        <div className="flex flex-col justify-center gap-8 max-w-[800px] mx-auto p-12">
          {pages.map((page) => (
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
