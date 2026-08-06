import { defineConfig } from "drizzle-kit";

/**
 * Local / Neon Postgres via DATABASE_URL (TS-011 / TS-012).
 * Do not point CI at Neon branches (TS-026) — integration uses GH Actions Postgres later (M2-14).
 */
export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
