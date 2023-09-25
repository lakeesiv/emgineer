import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "server/api/root";
import { createTRPCContext } from "server/api/trpc";
import { _auth } from "server/auth";

export const runtime = "edge";
// export const preferredRegion = "fra1";

const handler = _auth((req: Request): Response | Promise<Response> =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
    onError:
      process.env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
            );
          }
        : undefined,
  })
);
export const GET = handler as (req: Request) => Response | Promise<Response>;
export const POST = handler as (req: Request) => Response | Promise<Response>;
