import { Suspense } from "react";
import BlogSection, { BlogSectionLoading } from "./_components/blog-section";
import EventSection, { EventSectionLoading } from "./_components/event-section";
import { Description, Title } from "components/text";
import AnimatedCanvas from "./_components/animated-canvas";
import { getMetaData } from "lib/meta";

export const runtime = "nodejs";
export const revalidate = 86400;

export const metadata = getMetaData({
  title: "Home",
  description: "Emmanuel College Engineering Society",
});

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <AnimatedCanvas>
          <Title animate>Emgineers</Title>
          <Description>Emmanuel College Engineering Society</Description>
        </AnimatedCanvas>
      </section>
      <Suspense fallback={<EventSectionLoading />}>
        <EventSection />
      </Suspense>
      <Suspense fallback={<BlogSectionLoading />}>
        <BlogSection />
      </Suspense>
    </>
  );
}
