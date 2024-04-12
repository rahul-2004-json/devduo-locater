//helps connect to database query and store the data
import { drizzle } from "drizzle-orm/postgres-js";
//the database we are using
import postgres from "postgres";
import * as schema from "./schema";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

declare global {
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;

if (process.env.NODE_ENV === "production") {
  db = drizzle(postgres(process.env.DATABASE_URL!), { schema });
} else {
  if (!global.db) {
    global.db = drizzle(postgres(process.env.DATABASE_URL!), { schema });
  }

  db = global.db;
}

export { db };
