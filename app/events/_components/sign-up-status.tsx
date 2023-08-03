import { Button } from "components/ui/button";
import React from "react";
import { getServerAuthSession } from "server/auth";
import Login from "./login-in";
import { api } from "trpc/server";

interface SignUpStatusProps {
  eventId: string;
  slug: string;
}

const SignUpStatus = async ({ eventId, slug }: SignUpStatusProps) => {
  try {
    const { status } = await api.events.userSignUpStatus.query({
      eventId: eventId,
    });
    let buttonClassName = "w-full mt-4 ";

    switch (status) {
      case "Going":
        buttonClassName += "bg-green-500 hover:bg-green-600";
        break;
      case "Going (Paid)":
        buttonClassName += "bg-green-500 hover:bg-green-600";
        break;
      case "Not Going":
        buttonClassName += "bg-red-500 hover:bg-red-600";
        break;
      case "RVSP":
        buttonClassName += "bg-blue-500 hover:bg-blue-600";
        break;
      case "Awaiting Payment/Approval":
        buttonClassName += "bg-yellow-500 hover:bg-yellow-600";
        break;
    }

    return (
      <Button className={buttonClassName} href={`/events/${slug}`}>
        {status}
      </Button>
    );
  } catch (e) {
    return <Login />;
  }
};

export default SignUpStatus;
