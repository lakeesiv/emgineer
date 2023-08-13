import { Suspense } from "react";
import BlogSection, { BlogSectionLoading } from "./blog-section";
import EventSection, { EventSectionLoading } from "./event-section";
import { Description, Title } from "components/text";

export const runtime = "edge";
export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center p-12">
        <Title animate>Emgineers</Title>
        <Description>Emmanuel College Engineering Society</Description>
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
