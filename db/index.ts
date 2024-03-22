//helps connect to database query and store the data
import { drizzle } from "drizzle-orm/postgres-js";
//the database we are using
import postgres from "postgres";
import * as schema from "./schema";

// for query purposes
//connection url so that drizzle knows where databse lives
const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient, { schema });

export { db };
