import { AnimatedTitle } from "components/text";
import { Skeleton } from "components/ui/skeleton";

export default async function EventIndex() {
  return (
    <div>
      <AnimatedTitle variant="h3" size="sm" className="mt-4">
        Upcoming Events
      </AnimatedTitle>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
      </div>
      <AnimatedTitle variant="h3" size="sm">
        Past Events
      </AnimatedTitle>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        <Skeleton className="h-52" />
        <Skeleton className="h-52" />
      </div>
    </div>
  );
}
