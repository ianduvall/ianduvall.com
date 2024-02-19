import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export const createSQL = () => {
	const sql = neon(process.env.DBURL!);

	return sql;
};

export const createDB = () => {
	const sql = createSQL();
	const db = drizzle(sql);

	return db;
};
