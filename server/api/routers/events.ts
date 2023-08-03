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
      eventId: z.string(),
      extraDetails: z.string().optional(),
    })
  )
  .mutation(async ({ ctx, input: { status, eventId, extraDetails } }) => {
    const { name, email } = ctx.session.user;
    const res = ctx.notion.upsertSignUp(
      name,
      email,
      eventId,
      status,
      extraDetails
    );

    return res;
  });

export const userSignUpStatus = protectedProcedure
  .input(z.object({ eventId: z.string() }))
  .query(async ({ ctx, input: { eventId } }) => {
    const { name, email } = ctx.session.user;
    const res = await ctx.notion.getSignUp(name, email, eventId);

    if (!res) {
      return {
        status: "RVSP",
        extraDetails: "",
        going: "No",
        payment: "Not Needed",
      };
    }

    const going = res.properties.Going.select?.name as "Yes" | "No";
    const payment = res.properties.Payment.select?.name as
      | "Paid"
      | "Not Paid"
      | "Not Needed";

    let status = "";

    if (going === "No") {
      status = "Not Going";
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
  userSignUpStatus: userSignUpStatus,
});
