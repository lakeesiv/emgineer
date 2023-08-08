import { AnimatedTitle } from "components/text";
import { Card } from "components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const NotFoud: FC = ({}) => {
  return (
    <section className="flex flex-col items-center justify-center p-12">
      <AnimatedTitle>404 Not Found</AnimatedTitle>
      <Image
        src="/missingno.webp"
        alt="Missingno"
        width={500}
        height={500}
        className="mt-4 rounded-md  object-cover object-center"
      />
      <div className="grid grid-cols-3 gap-4 w-[500px] mt-4">
        <Card className="col-span-2 p-4 flex  align-center items-center text-center">
          <p className="font-extrabold text-emma-primary">What will you do?</p>
        </Card>
        <Card className="grid grid-cols-2 grid-rows-2 p-4 gap-4">
          <Link
            href="/"
            className="text-emma-primary hover:text-emma-secondary font-extrabold"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="text-emma-primary hover:text-emma-secondary font-extrabold"
          >
            Blog
          </Link>
          <Link
            href="/events"
            className="text-emma-primary hover:text-emma-secondary font-extrabold"
          >
            Events
          </Link>
          <Link
            href="/credits"
            className="text-emma-primary hover:text-emma-secondary font-extrabold"
          >
            Credits
          </Link>
        </Card>
      </div>
    </section>
  );
};

export default NotFoud;
