"use client";

import { Button } from "components/ui/button";
import React from "react";
import { api } from "trpc/client";

const UserClient = () => {
  return (
    <Button
      onClick={async () => {
        const res = await api.events.signUp.mutate({
          status: "Yes",
        });
      }}
    >
      Add Entry
    </Button>
  );
};

export default UserClient;
