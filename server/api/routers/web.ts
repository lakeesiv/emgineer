import { TRPCError } from "@trpc/server";
import { revalidateTag } from "next/cache";
import { createTRPCRouter, protectedProcedure } from "server/api/trpc";

const ADMIN_USERS = ["ls914"];

export const webRouter = createTRPCRouter({
  revalidate: protectedProcedure.query(({ ctx }) => {
    const email = ctx.session.user.email.split("@")[0];
    if (!ADMIN_USERS.includes(email)) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not authorized to revalidate the cache",
      });
    }
    revalidateTag("notion");
    return { revalidated: true, now: Date.now() };
  }),
});
