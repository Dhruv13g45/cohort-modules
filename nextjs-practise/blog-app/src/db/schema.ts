import { integer, pgTable, varchar } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    username: varchar("username",{length: 250}).notNull(),
    email: varchar("email",{length: 250}).notNull().unique(),
    password: varchar("password",{length: 100}).notNull(),
})


export const blogsTable = pgTable("blogs", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    blogTitle: varchar({length: 500}).notNull(),
    blogContent: varchar().notNull(),
    blogAuthorId: integer("author_id").notNull().references(()=> usersTable.id)
})