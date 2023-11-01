import { InferSelectModel, sql } from "drizzle-orm";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const tasks = sqliteTable("task", {
  id: integer("id").primaryKey(),
  taskName: text("task_name").notNull(),
  taskDescription: text("task_description").notNull(),
  taskCompleted: integer("task_completed", { mode: "boolean" })
    .default(false)
    .notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export type Task = InferSelectModel<typeof tasks>;
