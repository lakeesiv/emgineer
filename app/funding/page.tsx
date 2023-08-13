import React from "react";
import TimeLine from "./timeline";
import { Title } from "components/text";

const Page = () => {
  return (
    <main className="flex flex-col items-center justify-center p-12">
      <Title>Funding</Title>
      <p className="mt-6  text-center text-muted-foreground/80  md:text-xl">
        Have a side project you want to work on? We can help you get the
        resources you need to make it happen.
      </p>

      <TimeLine className="mt-8 md:mt-12" />
    </main>
  );
};

export default Page;
