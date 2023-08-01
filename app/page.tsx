import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col justify-center items-center mb-[100px]">
      <div className="max-w-[900px] p-12 mb-[90px]">
        <h1
          className="animate-fade-up bg-gradient-to-br from-emma-text to-emma-text-secondary bg-clip-text text-center text-6xl font-extrabold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem] pb-[0.8rem]"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          Emgineers
        </h1>
        <p
          className="mt-6 animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          Emmanuel College Engineering Society
        </p>
      </div>
      <BlogSection />
    </div>
  );
}

const BlogSection = () => {
  return (
    <section className="w-[900px]">
      <h2 className="text-3xl font-extrabold text-emma-text">Our Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <Card url={"/blog"} title="Blog" description="Blog Page" />
        <Card url={"/blog"} title="Blog" description="Blog Page" />
        <Card url={"/blog"} title="Blog" description="Blog Page" />
      </div>
    </section>
  );
};

const Card = ({
  url,
  title,
  description,
}: {
  url: string;
  title?: string | React.ReactNode;
  description?: string;
}) => {
  return (
    <div className="w-full h-full shadow-sm hover:shadow-lg  rounded-md outline-gray-100  outline-1 outline transition ease-in-out hover:-translate-y-1">
      <Link href={url}>
        <div className="p-8 md:p-12">
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm text-gray-500">{description}</div>
        </div>
      </Link>
    </div>
  );
};
