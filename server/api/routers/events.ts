import { eq } from "drizzle-orm";
import { eventSignUps } from "lib/db/schema";
import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import { z } from "zod";

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
    const { eventName, paymentRequired } =
      await ctx.notion.eventValidateAndPaymentCheck(eventId);
    // @ts-ignore

    const dbRes = await ctx.db
      .insert(eventSignUps)
      .values({
        name,
        id: crsid + "-" + eventId,
        userId: id,
        extraDetails,
        email: email,
        going: going,
        paid: paymentRequired ? false : null, // by default, if payment is required, then the user has not paid
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

    interface SignUpStatus {
      status:
        | "RVSP"
        | "Going"
        | "Going (Paid)"
        | "Awaiting Payment/Approval"
        | "Not Going"
        | "Maybe";

      extraDetails?: string;
      going?: "Yes" | "No" | "Maybe";
      payment?: boolean | null;
    }

    if (!signUpRow) {
      return {
        status: "RVSP",
        extraDetails: "",
        going: undefined,
      } as SignUpStatus;
    }
    const { going, paid } = signUpRow;

    let status = "RVSP";

    if (going === "No") {
      status = "Not Going";
    }
    if (going === "Maybe") {
      status = "Maybe";
    }

    if (going === "Yes" && paid === true) {
      status = "Going (Paid)";
    }

    if (going === "Yes" && paid === false) {
      status = "Awaiting Payment/Approval";
    }

    if (going === "Yes" && paid === null) {
      // payment not required
      status = "Going";
    }

    return {
      status,
      // @ts-ignore
      extraDetails: signUpRow.extraDetails,
      going,
      payment: paid,
    } as SignUpStatus;
  });

export const eventRouter = createTRPCRouter({
  signUp: signUp,
  signUpStatus: userSignUpStatus,
});
