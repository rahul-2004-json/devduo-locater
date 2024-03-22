import { pgTable, text } from "drizzle-orm/pg-core";

export const testing = pgTable("testing", {
  id: text("id").primaryKey().notNull(),
  fullName: text("full_name"),
});
