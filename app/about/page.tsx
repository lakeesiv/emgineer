import React from "react";
import siteConfig from "site.config";
import Member from "./member";

const Page = () => {
  return (
    <div>
      <h1
        className="animate-fade-up bg-gradient-to-br from-emma-primary to-emma-secondary bg-clip-text text-center text-6xl font-extrabold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem] pb-[0.8rem]"
        style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
      >
        Committee
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 content-start p-12 gap-x-4 gap-y-8">
        {siteConfig.commmittee.map((member) => (
          <Member member={member} key={member.name} />
        ))}
      </section>
    </div>
  );
};

export default Page;
