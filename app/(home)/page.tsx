import { Suspense } from "react";
import BlogSection from "./blog-section";
import EventSection from "./event-section";
import Loading from "./loading";
import { AnimatedDescription, AnimatedTitle } from "components/text";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center p-12">
        <AnimatedTitle>Emgineers</AnimatedTitle>
        <AnimatedDescription>
          Emmanuel College Engineering Society
        </AnimatedDescription>
      </section>
      <Suspense fallback={<Loading />}>
        <EventSection />
        <BlogSection />
      </Suspense>
    </>
  );
}
