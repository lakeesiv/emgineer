import { Button } from "components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import { api } from "trpc/server";
import SignIn from "./sign-in";

const UserDetails = async () => {
  try {
    const user = await api.user.me.query();
    return <div>{JSON.stringify(user)}</div>;
  } catch (error) {
    return <SignIn />;
  }
};

export default UserDetails;
