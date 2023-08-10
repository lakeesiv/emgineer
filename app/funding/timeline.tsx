import { cn } from "lib/utils";
import { Banknote, Mail, Scroll } from "lucide-react";
import { FC, HtmlHTMLAttributes } from "react";

interface TimelineItemProps {
  title: string;
  description: string;
  icon: JSX.Element;
  color: "blue" | "green" | "red" | "yellow" | "orange";
}

const TimelineItem: FC<TimelineItemProps> = ({
  title,
  description,
  icon,
  color,
}) => {
  const bgColors = {
    blue: "bg-blue-100 dark:bg-blue-900",
    green: "bg-green-100 dark:bg-green-700",
    red: "bg-red-100 dark:bg-red-900",
    yellow: "bg-yellow-100 dark:bg-yellow-600",
    orange: "bg-orange-100 dark:bg-orange-700",
  };

  return (
    <li className="ml-6">
      <span
        className={
          "absolute flex items-center justify-center w-6 h-6  rounded-full -left-3 ring-muted  ring " +
          bgColors[color]
        }
      >
        {icon}
      </span>
      <h3 className="mb-1 pt-6 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>

      <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </li>
  );
};

interface TimeLineProps extends HtmlHTMLAttributes<HTMLOListElement> {}

const TimeLine: FC<TimeLineProps> = ({ className, ...props }) => {
  return (
    <ol
      className={cn(
        "relative border-l border-gray-200 dark:border-gray-700",
        className
      )}
      {...props}
    >
      <TimelineItem
        title="Send Your Application"
        description="We will review your application"
        icon={<Mail className="h-[0.8rem] w-[0.8rem]" />}
        color="yellow"
      />
      <TimelineItem
        title="Review"
        description="We will review your application and get back to you"
        color="orange"
        icon={<Scroll className="h-[0.8rem] w-[0.8rem]" />}
      />
      <TimelineItem
        title="Success"
        description="If you are accepted, we will discuss the next steps and get you started."
        color="green"
        icon={<Banknote className="h-[0.8rem] w-[0.8rem]" />}
      />
    </ol>
  );
};

export default TimeLine;
