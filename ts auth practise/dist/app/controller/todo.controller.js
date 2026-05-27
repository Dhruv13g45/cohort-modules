import { db } from "../../db/index.js";
import { todoTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
const createTodo = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({
            message: "Cannot access title or content",
        });
    }
    const data = { title, content };
    const result = await db.insert(todoTable).values(data).returning();
    return res.status(201).json({
        message: "Created todo successfully",
        data: result
    });
};
const getAllTodos = async (req, res) => {
    const data = await db.select().from(todoTable);
    if (data.length === 0) {
        return res.status(200).json({
            message: "No items to fetch from db"
        });
    }
    return res.status(200).json({
        message: "Fetched all todos successfully",
        data: data
    });
};
const updateTodo = async (req, res) => {
    const id = Number(req.query.id);
    const { content } = req.body;
    if (!id) {
        return res.status(400).json({
            message: "Cannot get the id"
        });
    }
    const existingId = await db.select().from(todoTable).where(eq(todoTable.id, id));
    if (existingId.length === 0) {
        return res.status(404).json({
            message: "Couldn't find the id in database !!"
        });
    }
    await db
        .update(todoTable)
        .set({
        content: content,
    })
        .where(eq(todoTable.id, id));
    return res.status(200).json({
        message: "Updated todo successfully"
    });
};
const deleteTodo = async (req, res) => {
    const id = Number(req.query.id);
    if (!id) {
        return res.status(400).json({
            message: "Cannot recieve the id"
        });
    }
    const existingId = await db.select().from(todoTable).where(eq(todoTable.id, id));
    if (existingId.length === 0) {
        return res.status(404).json({
            message: "Couldn't find the id in database !!"
        });
    }
    await db.delete(todoTable).where(eq(todoTable.id, id));
    return res.status(200).json({
        message: "Deleted todo successfully"
    });
};
export { createTodo, deleteTodo, updateTodo, getAllTodos, };
//# sourceMappingURL=todo.controller.js.map