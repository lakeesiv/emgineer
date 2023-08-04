import BlogSection from "./blog-section";
import EventSection from "./event-section";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center p-12">
        <h1
          className="animate-fade-up bg-gradient-to-br from-emma-primary to-emma-secondary bg-clip-text text-center text-6xl font-extrabold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem] pb-[0.8rem]"
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
      </section>
      <EventSection />
      <BlogSection />
    </>
  );
}
