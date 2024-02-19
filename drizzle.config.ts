import type { Config as DrizzleKitConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

if (!process.env.DBURL) {
	throw new Error("DBURL is not set in environment");
}

export default {
	schema: "./src/db/schema.ts",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		connectionString: process.env.DBURL!,
	},
	verbose: true,
	strict: true,
} satisfies DrizzleKitConfig;
