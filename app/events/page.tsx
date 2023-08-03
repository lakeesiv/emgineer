import UserDetails from "components/auth/user-details";
import { getParsedEventPages } from "../get";
import { EventCard } from "./event-card";
import UserClient from "./user-client";

export const revalidate = 60;

export default async function EventIndex() {
  const pages = await getParsedEventPages();

  return (
    <div>
      <h1 className="text-center font-extrabold text-emma-text text-3xl m-4">
        Events <UserClient />
      </h1>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        <div className="items-center text-center text-emma-text text-xl">
          <UserDetails />
        </div>
        {pages.map((page) => (
          <>
            <EventCard page={page} />
          </>
        ))}
      </div>
    </div>
  );
}
