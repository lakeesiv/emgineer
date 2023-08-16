import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL as string,
  },
} satisfies Config;
