import { eq } from "drizzle-orm";
import { users } from "lib/db/schema";
import { stripe } from "lib/stripe";
import { getUrl } from "lib/utils";
import { createTRPCRouter, protectedProcedure } from "server/api/trpc";
import { z } from "zod";

export const stripeRouter = createTRPCRouter({
  createSession: protectedProcedure
    .input(
      z.object({
        eventId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId } = input;
      const {
        session: { user },
        db,
        notion,
      } = ctx;

      let stripeId = user.stripeId;

      if (!user.stripeId) {
        // create stripe customer
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        });
        const customerId = customer.id;

        // update user
        const updatedUser = await db
          .update(users)
          .set({
            stripeId: customerId,
          })
          .where(eq(users.id, user.id))
          .returning({
            stripeId: users.stripeId,
          });

        stripeId = updatedUser[0].stripeId as string;
      }

      const { email, name, id } = user;
      const url = getUrl() + "/events/" + eventId;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        client_reference_id: id,
        customer: stripeId,
        cancel_url: url,
        success_url: url,
        line_items: [
          {
            price: "price_1NfMHfJanqXBQ5sgF9BfZwLu",
            quantity: 1,
          },
        ],
      });

      if (!session.url) return { success: false as const };
      return { success: true as const, url: session.url };
    }),
});
