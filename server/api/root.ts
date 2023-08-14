import { createTRPCRouter } from "server/api/trpc";
import { eventRouter } from "./routers/events";
import { userRouter } from "./routers/user";
import { webRouter } from "./routers/web";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  events: eventRouter,
  user: userRouter,
  web: webRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
