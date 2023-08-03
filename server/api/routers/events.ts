import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "server/api/trpc";

export const eventRouter = createTRPCRouter({
  status: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      const id = input.id;
      const user = ctx.session.user;
      return {
        id: `${id}`,
        user: JSON.stringify(user, null, 2),
      };
    }),
});
