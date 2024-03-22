import { defineConfig } from "drizzle-kit";
export default defineConfig({
  //schema is the file that contains the tables
  schema: "./db/schema.ts",
  //pg stands for postgres
  driver: "pg",
  dbCredentials: {
    // ! signs tells typescript that the value is not null
    //we are connecting our postgres database with orm
    connectionString: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
