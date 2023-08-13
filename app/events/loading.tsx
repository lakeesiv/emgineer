import { Title } from "components/text";
import { Skeleton } from "components/ui/skeleton";

export const runtime = "edge";
export const revalidate = 86400;

export default function EventIndex() {
  return (
    <div>
      <Title variant="h3" size="sm" className="mt-4">
        Upcoming Events
      </Title>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
      <Title variant="h3" size="sm">
        Past Events
      </Title>
      <div className="space-y-8 gap-8 max-w-[800px] mx-auto p-12">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  );
}
