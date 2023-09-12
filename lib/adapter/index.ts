import { PgTableFn } from "drizzle-orm/pg-core/index";
import { SQLiteDrizzleAdapter } from "./lib/sqlite";
import { AnyPgDatabase, TableFn } from "./lib/utils";

import type { Adapter } from "@auth/core/adapters";
import {
  BaseSQLiteDatabase,
  SQLiteTableFn,
  sqliteTable,
} from "drizzle-orm/sqlite-core";
import { LibSQLDatabase } from "drizzle-orm/libsql";

export function DrizzleAdapter<SqlFlavor extends AnyPgDatabase>(
  db: InstanceType<typeof LibSQLDatabase>,
  table = sqliteTable
): Adapter {
  return SQLiteDrizzleAdapter(db, table);
}
