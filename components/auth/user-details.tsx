import { Button } from "components/ui/button";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { api } from "trpc/server";
import SignIn from "./sign-in";
import Link from "next/link";

interface UserDetailsProps {
  fallback?: React.JSX.Element;
}

const UserDetails = async (props: UserDetailsProps) => {
  try {
    await api.user.me.query();
    return (
      <Link href="/user" target="_blank">
        <Button className="pl-2 bg-emma-text">
          <ArrowUpRight className="inline-block mr-2" size={24} />
          View Your Booked Events
        </Button>
      </Link>
    );
  } catch (error) {
    return props.fallback || <SignIn />;
  }
};

export default UserDetails;
