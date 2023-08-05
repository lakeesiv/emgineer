import { Skeleton } from "components/ui/skeleton";
import { FC } from "react";

const Loading: FC = ({}) => {
  return (
    <>
      <section className="p-8 md:px-24">
        <h2 className="text-3xl font-extrabold text-emma-primary sm:text-center md:text-left">
          Upcoming Events
        </h2>
        <Skeleton className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 p-32 rounded-md" />
      </section>
      <section className="p-8 md:px-24">
        <h2 className="text-3xl font-extrabold text-emma-primary sm:text-center md:text-left">
          Our Blog
        </h2>
        <Skeleton className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 p-32 rounded-md" />
      </section>
    </>
  );
};

export default Loading;
