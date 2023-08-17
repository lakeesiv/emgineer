import { revalidateTag } from "next/cache";
import { createTRPCRouter, adminProcedure } from "server/api/trpc";

export const webRouter = createTRPCRouter({
  revalidate: adminProcedure.query(({ ctx }) => {
    revalidateTag("notion");
    return { revalidated: true, now: Date.now() };
  }),
});
