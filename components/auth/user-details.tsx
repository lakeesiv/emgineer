import { Button } from "components/ui/button";
import { signIn } from "next-auth/react";
import React from "react";
import { api } from "trpc/server";
import SignIn from "./sign-in";

interface UserDetailsProps {
  fallback?: React.JSX.Element;
}

const UserDetails = async (props: UserDetailsProps) => {
  try {
    const user = await api.user.me.query();
    return <div>{JSON.stringify(user)}</div>;
  } catch (error) {
    return props.fallback || <SignIn />;
  }
};

export default UserDetails;
