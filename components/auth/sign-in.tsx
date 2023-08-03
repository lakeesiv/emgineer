"use client";
import { Button } from "components/ui/button";
import React from "react";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return <Button onClick={() => signIn("google")}>Sign in To Register</Button>;
};

export default SignIn;
