import { pgTable, integer, varchar, text, date, timestamp, serial, boolean } from "drizzle-orm/pg-core";
export const todoTable = pgTable("todos", {
    id: serial("id").primaryKey(),
    title: varchar({ length: 500 }).notNull(),
    content: text("content"),
    isCompleted: boolean("completed").default(false),
    createdAt: timestamp('created_at').defaultNow(),
    eventDate: date('event_date', { mode: 'string' }),
});
//# sourceMappingURL=schema.js.map