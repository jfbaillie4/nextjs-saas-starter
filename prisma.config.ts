// This file configures the Prisma CLI (migrations, studio, etc.)
// It loads .env.local so the DATABASE_URL is available when running Prisma commands
// outside of Next.js (which normally handles .env.local loading itself).
import { config } from "dotenv";
config({ path: ".env.local" });
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
