import React from "react";
import TimeLine from "./timeline";
import { Title } from "components/text";
import siteConfig from "site.config";

const Page = () => {
  return (
    <main className="flex flex-col items-center justify-center p-12">
      <Title>Funding</Title>
      <p className="mt-6  text-center text-muted-foreground/80  md:text-xl">
        Have a side project you want to work on? We can help you get the
        resources you need to make it happen.
      </p>

      <TimeLine className="mt-8 md:mt-12" />

      <div className="grid gap-8 items-start justify-center mt-12">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-tr from-emma-blue  via-emma-pink-secondary   to-emma-blue rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 "></div>
          <a
            className="relative px-7 py-4 bg-gray-50 dark:bg-black rounded-lg leading-none flex items-center "
            href={siteConfig.fundingUrl}
          >
            <span className="font-bold text-emma-primary group-hover:text-emma-secondary transition duration-1000">
              Apply for Funding
            </span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Page;
