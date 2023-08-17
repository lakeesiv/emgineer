import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/drizzle",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DB_URL as string,
  },
} satisfies Config;
