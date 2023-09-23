import React from "react";
import siteConfig from "site.config";
import Member from "./member";
import { Title } from "components/text";
import { getMetaData } from "lib/meta";

export const metadata = getMetaData({
  title: "About",
  description: "About the Emgineers",
});

const Page = () => {
  return (
    <div>
      <Title variant="h2" size="md" className="mt-4">
        Committee
      </Title>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 content-start p-12 gap-x-6 gap-y-8">
        {siteConfig.commmittee.map((member) => (
          <Member member={member} key={member.name} />
        ))}
      </section>
    </div>
  );
};

export default Page;
