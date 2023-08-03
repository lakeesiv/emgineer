"use client";

import { Button } from "components/ui/button";
import React, { use, useEffect, useState } from "react";
import { api, RouterOutputs } from "trpc/client";
import Login from "./login-in";
import { ErrorBoundary } from "react-error-boundary";

// import type {Rou}

interface RegisterFormProps {
  eventId: string;
  extraDetails?: string;
}

const RegisterForm = ({ eventId }: RegisterFormProps) => {
  const [userSignUpStatus, setUserSignUpStatus] = useState<
    RouterOutputs["events"]["userSignUpStatus"] | undefined
  >(undefined);
  const [unauthorized, setUnauthorized] = useState<boolean>(false);

  useEffect(() => {
    async function getUserSignUpStatus() {
      try {
        const res = await api.events.userSignUpStatus.query({
          eventId: eventId,
        });
        setUserSignUpStatus(res);
      } catch (error) {
        if ((error as { message: string }).message === "UNAUTHORIZED") {
          setUnauthorized(true);
        }
      }
    }
    getUserSignUpStatus();
  }, [eventId]);

  if (unauthorized && !userSignUpStatus) {
    return <Login />;
  }

  if (!userSignUpStatus && !unauthorized) {
    return <div>Loading...</div>;
  }

  if (!userSignUpStatus) {
    return <div>Uh oh: contact Webmaster</div>;
  }

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
      Current Sign Up Status: {JSON.stringify(userSignUpStatus)}
      <Button onClick={userSignUp}>Sign Up</Button>
    </div>
  );
};

const WithErrorBoundary = (props: RegisterFormProps) => {
  return (
    <ErrorBoundary fallback={<div>Oh no</div>}>
      <RegisterForm {...props} />
    </ErrorBoundary>
  );
};

export default WithErrorBoundary;
