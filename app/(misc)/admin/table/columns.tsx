"use client";

import { ColumnDef } from "@tanstack/react-table";
import { eventSignUps } from "lib/db/schema";
import { type InferSelectModel } from "drizzle-orm";

type SignUp = InferSelectModel<typeof eventSignUps>;
