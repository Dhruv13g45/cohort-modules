import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const priorityEnum = pgEnum("priority", [
  "low",
  "medium",
  "high",
]);


export const usersTable = pgTable("users", {
  id: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 250 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 200 }).notNull(),
});

export const todosTable = pgTable("todos", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("todo_title", { length: 200 }).notNull(),
  description: varchar("todo_description", { length: 300 })
    .notNull()
    .default("None"),
   priority: priorityEnum("priority")
    .default("medium")
    .notNull(),

  completed: boolean("completed").default(false).notNull(),

  dueDate: timestamp("due_date", {
    mode: "date",
  }),
  userId: integer("user_id").references(() => usersTable.id),
});
