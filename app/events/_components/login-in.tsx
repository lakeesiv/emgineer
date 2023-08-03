"use client";

import { Button } from "components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";

const Login = () => {
  return (
    <Button
      onClick={() => signIn("google")}
      className="bg-red-600 hover:bg-red-700 text-white mt-4 w-full"
    >
      Login to RSVP
    </Button>
  );
};

export default Login;
