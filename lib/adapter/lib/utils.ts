import { PgDatabase } from "drizzle-orm/pg-core";

import type { PgTableFn } from "drizzle-orm/pg-core";

export type AnyPgDatabase = PgDatabase<any, any, any>;

export type TableFn<Flavor> = PgTableFn;
