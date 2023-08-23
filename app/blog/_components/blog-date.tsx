const BlogDate = ({ date }: { date: string }) => {
  return (
    <time
      dateTime={new Date(date).toISOString()}
      className="text-gray-500 dark:text-slate-400"
    >
      {formatDate(date)}
    </time>
  );
};

export const formatDate = (date: string | undefined) => {
  const d = new Date(date as string) || new Date();
  // format date as Mon, Day Year (e.g. Nov 4, 2020)
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default BlogDate;
