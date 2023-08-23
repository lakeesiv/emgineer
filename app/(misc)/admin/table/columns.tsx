"use client";

import { ColumnDef } from "@tanstack/react-table";
import { eventSignUps } from "lib/db/schema";

type SignUpRow = {
  id: string;
  name: string;
  email: string;
  going: "Yes" | "No" | "Maybe";
  userId: string;
  eventId: string;
  event: string;
  paid: boolean | null;
  extraDetails: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<SignUpRow>[] = [
  //   {
  //     accessorKey: "id",
  //     header: "ID",
  //   },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <a
        className="text-blue-500 hover:underline font-mono"
        href={`mailto:${row.getValue("email")}`}
      >
        {row.getValue("email")}
      </a>
    ),
  },
  {
    accessorKey: "event",
    header: "Event",
  },
  {
    accessorKey: "going",
    header: "Going",
    cell: ({ row }) => {
      const going = row.getValue("going") as "Yes" | "No" | "Maybe" | null;
      if (going === null) {
        return null;
      }

      const bgColour =
        going === "Yes"
          ? "bg-green-600"
          : going === "No"
          ? "bg-red-500"
          : "bg-orange-500";

      return (
        <span className={`px-2 py-1 rounded-md text-white ${bgColour}`}>
          {going}
        </span>
      );
    },
  },
  {
    accessorKey: "paid",
    header: "Paid",
    cell: ({ row }) => {
      const paid = row.getValue("paid");
      if (paid === null) {
        return null;
      }

      const bgColour = paid ? "bg-green-600" : "bg-red-500";

      return (
        <span className={`px-2 py-1 rounded-md text-white ${bgColour}`}>
          {paid ? "Yes" : "No"}
        </span>
      );
    },
  },
  {
    accessorKey: "extraDetails",
    header: "Extra Details",
    cell: ({ row }) => (
      <span className="text-sm whitespace-pre">
        {row.getValue("extraDetails")}
      </span>
    ),
  },
  //   {
  //     accessorKey: "updatedAt",
  //     header: "Updated At",
  //   },
];
