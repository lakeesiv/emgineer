import { FC } from "react";
import { CommitteeMember } from "types/committe";
import Image from "next/image";

interface MemberProps {
  member: CommitteeMember;
}

const Member: FC<MemberProps> = ({
  member: { description, name, email, img, title },
}) => {
  return (
    <div
      className={`max-w-md flex flex-col space-y-6 md:space-y-8 ${
        img ? "md:grid-cols-2" : ""
      }`}
    >
      {img && (
        <div className="relative h-0 pb-[56.25%] md:pb-[75%] md:h-80 lg:pb-[56.25%] overflow-hidden bg-gray-400 dark:bg-slate-700 rounded shadow-lg">
          <Image
            alt={title || "Cover Image for " + title}
            src={"/public/committee/" + img}
            className="max-h-[300px] w-full rounded-md  object-cover object-center"
            width={300}
            height={300}
          />
        </div>
      )}
      <div>
        <header>
          <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-2 font-heading text-emma-primary">
            {title} - {name}
          </h2>
        </header>
        <p className="text-md flex-grow text-muted-foreground/80">
          {description}
        </p>
        <div className="mt-4">
          <a
            className="text-emma-primary font-mono"
            type="email"
            href={`mailto:${email}`}
          >
            {"<"}
            {email}
            {">"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Member;
