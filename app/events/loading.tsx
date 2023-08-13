import { AnimatedTitle } from "components/text";
import { getParsedEventPages } from "../get";
import { EventCard } from "./_components/event-card";
import EventSignUpStatus from "./_components/event-sign-up-status";
import { Suspense } from "react";
import { Skeleton } from "components/ui/skeleton";

export default function EventIndex() {
  return (
    <div>
      <AnimatedTitle variant="h3" size="sm" className="mt-4">
        Upcoming Events
      </AnimatedTitle>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
      <AnimatedTitle variant="h3" size="sm">
        Past Events
      </AnimatedTitle>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  );
}
