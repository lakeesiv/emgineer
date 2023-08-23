"use client";

import { ColumnDef } from "@tanstack/react-table";
import { eventSignUps } from "lib/db/schema";
import { type InferSelectModel } from "drizzle-orm";

type SignUp = typeof eventSignUps.$inferSelect

export const columns: ColumnDef<SignUp>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
	accessorKey: "",
];
