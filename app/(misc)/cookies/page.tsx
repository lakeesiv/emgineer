import React from "react";

const CookiesPage = () => {
  return (
    <section className="flex flex-col items-center justify-center p-12">
      <h1
        className="animate-fade-up bg-gradient-to-br from-emma-primary to-emma-secondary bg-clip-text text-center text-6xl font-extrabold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem] pb-[0.8rem]"
        style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
      >
        Cookies
      </h1>
      <p
        className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
        style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
      >
        By using this website, you agree to the use of cookies. We only use
        cookies to authenticate users. We do not use cookies for tracking or
        analytics.
      </p>
      <div
        className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
        style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
      >
        <div className="flex space-x-4 w-full justify-between">
          <div className="font-mono">CONSENT</div>
          <div className="font-mono">Profile Picture</div>
        </div>
        <div className="flex space-x-4 w-full justify-between">
          <div className="font-mono">__Secure-next-auth.session-token</div>
          <div className="font-mono">Authentication</div>
        </div>
        <div className="flex space-x-4 w-full justify-between">
          <div className="font-mono">next-auth.callback-url</div>
          <div className="font-mono">Authentication</div>
        </div>
        <div className="flex space-x-4 w-full justify-between">
          <div className="font-mono">next-auth.csrf-token</div>
          <div className="font-mono">Authentication</div>
        </div>
      </div>
    </section>
  );
};

export default CookiesPage;
