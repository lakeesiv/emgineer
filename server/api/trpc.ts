import { initTRPC, TRPCError } from "@trpc/server";
import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { Notion } from "lib/notion";
import superjson from "superjson";
import { ZodError } from "zod";
import { Session } from "../auth";
import { db } from "lib/db";
import siteConfig from "site.config";

interface ModfiedRequest extends Request {
  auth: Session;
}

type CreateContextOptions = {
  headers: Headers;
  req: ModfiedRequest;
};

export const createInnerTRPCContext = async (opts: CreateContextOptions) => {
  const session = opts.req.auth;
  if (session.user) {
    const crsid = session?.user?.email && session.user.email.split("@")[0];
    session.user.crsid = crsid;
  }
  const notion = new Notion();

  return {
    session,
    db,
    headers: opts.headers,
    notion,
  };
};

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  // Fetch stuff that depends on the request

  return await createInnerTRPCContext({
    headers: opts.req.headers,
    req: opts.req as ModfiedRequest,
  });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

const enforceUserIsAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const crsid = ctx.session.user.email.split("@")[0];

  if (!siteConfig.admins.includes(crsid)) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
export const adminProcedure = t.procedure.use(enforceUserIsAdmin);
