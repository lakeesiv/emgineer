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
  signUp: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        status: z.enum(["Yes", "No"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, email, status } = input;
      const res = ctx.notion.addSignUp(name, email, status);

      return res;
    }),
});
