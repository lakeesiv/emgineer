import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "server/api/trpc";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(({ ctx }) => {
    const user = ctx.session.user;
    return user;
  }),
});
