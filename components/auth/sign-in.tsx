"use client";
import { Button } from "components/ui/button";
import React from "react";
import { signIn } from "next-auth/react";
import { ArrowUpRight } from "lucide-react";

const SignIn = () => {
  return (
    <Button className="pl-2 bg-emma-text" onClick={() => signIn("google")}>
      <ArrowUpRight className="inline-block mr-2" size={24} />
      Sign in To Book Events
    </Button>
  );
};

export default SignIn;
