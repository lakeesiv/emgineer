import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "server/api/trpc";

export const signUp = protectedProcedure
  .input(
    z.object({
      status: z.enum(["Yes", "No"]),
    })
  )
  .mutation(async ({ ctx, input: { status } }) => {
    const { name, email } = ctx.session.user;
    const res = ctx.notion.addSignUp(name, email, status);

    return res;
  });

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
  signUp: signUp,
});
