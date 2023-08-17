import { PgTableFn } from "drizzle-orm/pg-core/index";
import { pgDrizzleAdapter } from "./lib/pg";
import { AnyPgDatabase, TableFn } from "./lib/utils";

import type { Adapter } from "@auth/core/adapters";

export function DrizzleAdapter<SqlFlavor extends AnyPgDatabase>(
  db: SqlFlavor,
  table?: TableFn<SqlFlavor>
): Adapter {
  return pgDrizzleAdapter(db, table as PgTableFn);
}
