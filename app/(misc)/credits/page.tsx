import React from "react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

const CreditsPage = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center p-12">
        <h1
          className="animate-fade-up bg-gradient-to-br from-emma-primary to-emma-secondary bg-clip-text text-center text-6xl font-extrabold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem] pb-[0.8rem]"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          Credits
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          This website was made by{" "}
          <Link
            href="https://lakeesiv.com"
            target="_blank"
            className="text-emma-primary ml-1 hover:text-emma-secondary transition-colors font-mono"
          >
            Lakee Sivaraya
          </Link>
        </p>
        <p
          className="mt-2 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          The code is open source and can be found on{" "}
          <Link
            href="https://github.com/lakeesiv/emgineer"
            target="_blank"
            className="text-emma-primary ml-1 hover:text-emma-secondary transition-colors font-mono"
          >
            github/lakeesiv/emgineer
          </Link>
        </p>
        <p
          className="mt-2 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          If you use this code please link back to this website and the github
          repository.
        </p>
      </section>
      <section className=" flex flex-col items-center justify-center px-12 pb-12">
        <h2
          className="mt-6 animate-fade-up bg-gradient-to-br from-emma-primary to-emma-secondary bg-clip-text text-center text-5xl font-extrabold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-5xl/[5rem] pb-[0.8rem]"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          Stack
        </h2>
        <p
          className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          {"Wouldn't"} be possible without these:
        </p>
        <p
          className="font-mono mt-2 animate-fade-up text-center text-emma-primary opacity-0 md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          Next.js, TailwindCSS, NextAuth.js, notion-on-next, shadcn/ui,
          radix-ui, tRPC
        </p>
        <p
          className="mt-4 animate-fade-up text-center text-muted-foreground/80 max-w-[700px]   opacity-0 md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          <Balancer>🩸🩸🩸 Edge Runtime Compliant 🩸🩸🩸</Balancer>
        </p>
        <p
          className="mt-4 animate-fade-up text-center text-muted-foreground/80 max-w-[700px]   opacity-0 md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          <Balancer>
            (ISR {"doesn't"} work on edge yet :( so the ISR pages are on the
            Node runtime however these can be made into edge runtime pages to
            make the site fully on the edge.) Lots of bleeding edge experimental
            features are being used ( Next 13 App Router, NextAuth.js on the
            edge, tRPC App Router ) so expect API changes if you use this code
            and update your dependencies.
          </Balancer>
        </p>
      </section>
    </>
  );
};

export default CreditsPage;
