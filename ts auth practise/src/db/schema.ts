import { pgTable, integer, varchar, text, date, timestamp, serial, boolean } from "drizzle-orm/pg-core";


export const todoTable = pgTable("todos",{
    id: serial("id").primaryKey(),
    title: varchar({ length: 500}).notNull(),
    content: text("content"),
    isCompleted: boolean("completed").default(false),

    createdAt: timestamp('created_at').defaultNow(),
    eventDate: date('event_date', { mode: 'string' }),
})



export const userTable = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length:100}).notNull(),
    email: varchar("email", {length:100}).notNull().unique(),
    password: varchar("password", {length:250}).notNull(),
    phoneNumber: varchar("phone_number", {length:10}).notNull(),
    isVerified: boolean("is_verified").default(false),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
})