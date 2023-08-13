import { Title } from "components/text";
import { Card } from "components/ui/card";
import Image from "next/image";
import { FC } from "react";

const NotFoud: FC = ({}) => {
  return (
    <section className="flex flex-col items-center justify-center p-12">
      <Title>404 Not Found</Title>
      <Image
        src="/missingno.webp"
        alt="Missingno"
        width={500}
        height={500}
        className="mt-4 rounded-md  object-cover object-center"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[500px] mt-4 text-sm md:text-md">
        <Card className="md:col-span-2 p-4 flex  align-center items-center text-center">
          <p className="font-extrabold text-emma-primary">What will you do?</p>
        </Card>
        <Card className="grid grid-cols-2 grid-rows-2 p-4 gap-4">
          <a
            href="/"
            className="transition-colors text-emma-primary hover:text-emma-secondary font-extrabold underline underline-offset-4"
          >
            Home
          </a>
          <a
            href="/blog"
            className="transition-colors text-emma-primary hover:text-emma-secondary font-extrabold underline underline-offset-4"
          >
            Blog
          </a>
          <a
            href="/events"
            className="transition-colors text-emma-primary hover:text-emma-secondary font-extrabold underline underline-offset-4"
          >
            Events
          </a>
          <a
            href="/credits"
            className="transition-colors text-emma-primary hover:text-emma-secondary font-extrabold underline underline-offset-4"
          >
            Credits
          </a>
        </Card>
      </div>
    </section>
  );
};

export default NotFoud;
