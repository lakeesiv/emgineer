"use client";
import { Button } from "components/ui/button";
import { FC } from "react";

import { api } from "trpc/client";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  async function createSession() {
    const { url } = await api.stripe.createSession.mutate({
      eventId: "hom-formal-2023",
    });
    if (url) window.location.href = url;
  }
  return (
    <div>
      <Button onClick={createSession}>Test Page</Button>
    </div>
  );
};

export default page;
