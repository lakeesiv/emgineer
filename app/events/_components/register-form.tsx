"use client";

import { Button } from "components/ui/button";
import React, { use } from "react";
import { api } from "trpc/client";
import Login from "./login-in";

interface RegisterFormProps {
  eventId: string;
  extraDetails?: string;
}

const RegisterForm = ({ eventId }: RegisterFormProps) => {
  const currentSignUpStatus = use(
    api.events.userSignUpStatus.query({
      eventId: eventId,
    })
  );

  async function userSignUp() {
    try {
      const res = await api.events.signUp.mutate({
        status: "Yes",
        eventId: eventId,
        extraDetails: undefined,
      });
      window.location.reload();
    } catch (error) {
      console.log((error as { message: string }).message);
    }
  }

  return (
    <div>
      Current Sign Up Status: {JSON.stringify(currentSignUpStatus)}
      <Button onClick={userSignUp}>Sign Up</Button>
    </div>
  );
};

export default RegisterForm;
