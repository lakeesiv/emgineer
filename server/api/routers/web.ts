import { revalidateTag } from "next/cache";
import { createTRPCRouter, adminProcedure } from "server/api/trpc";

export const webRouter = createTRPCRouter({
  revalidate: adminProcedure.query(({ ctx }) => {
    revalidateTag("notion");
    return { revalidated: true, now: Date.now() };
  }),
  redeploy: adminProcedure.query(({ ctx }) => {
    const redeployHookUrl = process.env.REDEPLOY_HOOK_URL;
    if (!redeployHookUrl) {
      throw new Error("REDEPLOY_HOOK_URL is not set");
    }

    fetch(redeployHookUrl, { method: "POST" });
    return { redeployed: true, now: Date.now() };
  }),
});
