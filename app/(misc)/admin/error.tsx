"use client";
import { Title } from "components/text";
import { FC } from "react";

interface AdminErrorProps {}

const AdminError: FC<AdminErrorProps> = ({}) => {
  return (
    <section className="flex flex-col items-center justify-center p-12">
      <Title>You {"Aren't"} Supposed To Be Here</Title>
    </section>
  );
};

export default AdminError;
