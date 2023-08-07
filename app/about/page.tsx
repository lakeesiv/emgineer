import React from "react";
import siteConfig from "site.config";
import Member from "./member";
import { AnimatedTitle } from "components/text";

const Page = () => {
  return (
    <div>
      <AnimatedTitle variant="h2" size="md">
        Committee
      </AnimatedTitle>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 content-start p-12 gap-x-4 gap-y-8">
        {siteConfig.commmittee.map((member) => (
          <Member member={member} key={member.name} />
        ))}
      </section>
    </div>
  );
};

export default Page;
