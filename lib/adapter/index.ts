import { PgTableFn } from "drizzle-orm/pg-core/index";
import { SQLiteDrizzleAdapter } from "./lib/sqlite";
import { AnyPgDatabase, TableFn } from "./lib/utils";

import type { Adapter } from "@auth/core/adapters";
import {
  BaseSQLiteDatabase,
  SQLiteTableFn,
  sqliteTable,
} from "drizzle-orm/sqlite-core";

export function DrizzleAdapter<SqlFlavor extends AnyPgDatabase>(
  db: InstanceType<typeof BaseSQLiteDatabase>,
  table = sqliteTable
): Adapter {
  return SQLiteDrizzleAdapter(db, table);
}
