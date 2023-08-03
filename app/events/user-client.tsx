"use client";

import { Button } from "components/ui/button";
import React, { use } from "react";
import { api } from "trpc/client";

const UserClient = () => {
  return (
    <Button
      onClick={async () => {
        const res = await api.events.signUp.mutate({
          status: "Yes",
          eventId: "2",
          extraDetails: "Sounds like fun",
        });
      }}
    >
      A
    </Button>
  );
};

export default UserClient;
