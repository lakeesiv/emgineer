"use client";

import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";
import { FC } from "react";
import { RouterOutputs, api } from "trpc/client";

interface PaymentNoticeProps {
  eventId: string;
  signUpStatus: RouterOutputs["events"]["signUpStatus"];
  price: number;
}

export const PaymentNotice: FC<PaymentNoticeProps> = ({
  eventId,
  signUpStatus: { going, paid },
  price,
}) => {
  const { toast } = useToast();

  if (going === "Yes" && !paid) {
    return (
      <div>
        <div className="flex flex-col w-full p-4 rounded-md items-center bg-orange-700  text-white">
          <p>
            You have said {"'Yes'"} to this event, but have not paid yet. You
            can pay by clicking the button below.
          </p>
        </div>
        <Button
          className="bg-green-700 hover:bg-green-800 text-white mt-4 w-full"
          onClick={async () => {
            try {
              const { url, success } = await api.stripe.createSession.mutate({
                eventId: eventId,
              });
              if (!success) {
                throw new Error("Failed to checkout create session");
              }
              toast({
                title: "Redirecting to payment",
              });

              // Redirect to payment page
              setTimeout(() => {
                window.location.href = url;
              }, 3000);
            } catch (error) {
              const message = (error as { message: string }).message;
              toast({
                title: "Event Sign Up",
                description: "Something went: " + message,
                variant: "destructive",
              });
            }
          }}
        >
          Pay
        </Button>
      </div>
    );
  }

  if (going === "Yes" && paid) {
    return (
      <div className="flex w-full p-4 rounded-md  bg-green-700 hover:bg-green-800 text-white">
        You have paid for event, hope you look forward to it 🎉🎉🎉
      </div>
    );
  }

  if (going !== "Yes") {
    return (
      <div className="flex w-full p-4 rounded-md  bg-emma-secondary text-white">
        Requires Payment of £{price}. You will be automatically redirected to
        payment when you say {"'Yes'"}, you can cancel that session and pay
        later by coming back to this page.
      </div>
    );
  }
};
