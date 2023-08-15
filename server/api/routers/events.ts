import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "server/api/trpc";
import { eventSignUps } from "lib/db/schema";
import { eq, lt, gte, ne } from "drizzle-orm";

export const signUp = protectedProcedure
  .input(
    z.object({
      going: z.enum(["Yes", "No", "Maybe"]),
      eventId: z.string(),
      extraDetails: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input: { going, eventId, extraDetails } }) => {
    const { name, email, crsid, id } = ctx.session.user;
    const event = await ctx.notion.getEvent(eventId);
    // @ts-ignore
    const eventName = event.properties.Name.title[0].plain_text as string;

    const dbRes = await ctx.db
      .insert(eventSignUps)
      .values({
        name,
        id: crsid + "-" + eventId,
        userId: id,
        extraDetails,
        email: email,
        going: going,
        eventId: eventId,
        event: eventName,
      })
      .onConflictDoUpdate({
        target: eventSignUps.id,
        set: {
          going,
          extraDetails,
        },
      });

    if (dbRes.rowCount === 0) {
      throw new Error("Failed to insert");
    }

    return {
      success: true,
    };
  });

export const userSignUpStatus = protectedProcedure
  .input(z.object({ eventId: z.string() }))
  .query(async ({ ctx, input: { eventId } }) => {
    const { crsid } = ctx.session.user;

    const id = crsid + "-" + eventId;
    const signUpRow = await ctx.db.query.eventSignUps.findFirst({
      where: eq(eventSignUps.id, id),
    });

    if (!signUpRow) {
      return {
        status: "RVSP",
        extraDetails: "",
        going: "",
      };
    }
    const { going } = signUpRow;
    const payment = "Paid";

    let status = "RVSP";

    if (going === "No") {
      status = "Not Going";
    }
    if (going === "Maybe") {
      status = "Maybe";
    }

    if (going === "Yes" && payment === "Paid") {
      status = "Going (Paid)";
    }

    if (going === "Yes" && payment === "Not Paid") {
      status = "Awaiting Payment/Approval";
    }

    if (going === "Yes" && payment === "Not Needed") {
      status = "Going";
    }

    return {
      status,
      // @ts-ignore
      extraDetails: signUpRow.extraDetails,
      going,
      payment,
    };
  });

export const eventRouter = createTRPCRouter({
  signUp: signUp,
  signUpStatus: userSignUpStatus,
});
