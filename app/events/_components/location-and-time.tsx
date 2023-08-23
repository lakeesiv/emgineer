import { ParsedEventsPageObjectResponse } from "app/get";

const LocationAndTime = ({
  page,
  children,
}: {
  page: ParsedEventsPageObjectResponse;
  children?: React.ReactNode;
}) => {
  // only renedr on client
  if (typeof window === "undefined") return null;

  return (
    <span className="text-gray-500 dark:text-slate-400">
      {formatDate(page.parsed.date)} @ {page.parsed.location}
    </span>
  );
};
export const formatDate = (date: Date) => {
  const days = date.toLocaleDateString("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // time: HH:MM AM/PM
  const time = date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${time}, ${days}`;
};

export default LocationAndTime;
