import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "server/api/trpc";
import { eventSignUps } from "lib/db/schema";

export const signUp = protectedProcedure
  .input(
    z.object({
      going: z.enum(["Yes", "No", "Maybe"]),
      eventId: z.string(),
      extraDetails: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input: { going, eventId, extraDetails } }) => {
    const { name, email, id } = ctx.session.user;
    const event = ctx.notion.getEvent(eventId);
    // @ts-ignore
    const eventName = event.properties.Name.title[0].plain_text as string;

    const dbRes = await ctx.db
      .insert(eventSignUps)
      .values({
        name,
        id: email + "-" + eventId,
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

    const res = ctx.notion.upsertSignUp(
      name,
      email,
      eventId,
      going,
      extraDetails
    );

    return res;
  });

export const userSignUpStatus = protectedProcedure
  .input(z.object({ eventId: z.string() }))
  .query(async ({ ctx, input: { eventId } }) => {
    const { name, email } = ctx.session.user;
    const res = await ctx.notion.getSignUp(name, email, eventId);

    const going = res?.properties?.Going?.select?.name as
      | "Yes"
      | "No"
      | "Maybe";

    let status = "RVSP" as
      | "RVSP"
      | "Not Going"
      | "Going (Paid)"
      | "Going"
      | "Awaiting Payment/Approval"
      | "Maybe";

    const payment = res?.properties?.Payment?.select?.name as
      | "Paid"
      | "Not Paid"
      | "Not Needed";

    if (!res) {
      return {
        status: status,
        extraDetails: "",
        going: going,
        payment: "Not Needed",
      };
    }

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
      extraDetails: res.properties["Extra Details"].rich_text[0].plain_text,
      going,
      payment,
    };
  });

export const eventRouter = createTRPCRouter({
  signUp: signUp,
  signUpStatus: userSignUpStatus,
});
