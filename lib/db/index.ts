import "server-only";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

type Db = ReturnType<typeof drizzle<typeof schema>>;

let client: ReturnType<typeof postgres> | undefined;
let db: Db | undefined;

/**
 * Lazy Drizzle client — safe to import during `pnpm build` / CI without DATABASE_URL.
 * Throws only when a caller actually needs the database.
 */
export function getDb(): Db {
  if (db) {
    return db;
  }

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and set a Postgres URL.",
    );
  }

  client = postgres(url, { max: 1 });
  db = drizzle(client, { schema });
  return db;
}
