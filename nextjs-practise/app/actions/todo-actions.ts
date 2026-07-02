"use server";
import { verifyToken } from "@/app/libs/auth";
import { db } from "@/app/src";
import { todosTable } from "@/app/src/db/schema";
import { cookies } from "next/headers";
import { and, eq } from "drizzle-orm";

export const getAlltodos = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("User not verified to access");
  }

  const userPayload = verifyToken(token);

  if (!userPayload) {
    throw new Error("No user payload found");
  }

  const allTodos = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable?.userId, Number(userPayload?.id)));

  if (allTodos.length === 0) {
    return "No todos exists in the table";
  }

  return {
    statusCode: 200,
    message: "Fetched all todos",
    todos: allTodos,
  };
};

export const getSingleTodo = async (id: string) => {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("User not verified");
  }

  const userPayload = verifyToken(token);

  if (!userPayload) {
    throw new Error("No user payload found");
  }

  const singleTodo = await db
    .select()
    .from(todosTable)
    .where(
      and(
        eq(todosTable.id, Number(id)),
        eq(todosTable.userId, Number(userPayload.id))
      )
    );

  if (singleTodo.length === 0) {
    throw new Error("Couldn't find any todo");
  }

  return {
    message: "Found the todo",
    statusCode: 200,
    todo: singleTodo, 
  };
};

export const createTodo = async (formData: FormData) => {
  const todoData: Record<string, FormDataEntryValue> = {};

  formData.forEach((value, key) => {
    todoData[key] = value;
  });

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("User not verified to access");
  }

  const userPayload = verifyToken(token);

  if (!userPayload) {
    throw new Error("No user payload found");
  }

  const [newTodo] = await db
    .insert(todosTable)
    .values({
      title: String(todoData?.title),
      description: String(todoData?.description),
      priority: todoData.priority as "low" | "medium" | "high",
      userId: Number(userPayload?.id),
      completed: todoData?.completed === "true" ? true : false,
      dueDate: todoData?.dueDate ? new Date(String(todoData?.dueDate)) : null,
    })
    .returning();

  if (!newTodo) {
    throw new Error("Error creating a todo");
  }

  return {
    message: "Created a todo successfully",
    statusCode: 200,
    data: newTodo,
  };
};

export const updateTodo = async (id: string, formData: FormData) => {

  const todoData: Record<string, FormDataEntryValue> = {};

  formData.forEach((value, key) => {
    todoData[key] = value;
  });

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("User not verified to access");
  }

  const userPayload = verifyToken(token);

  if (!userPayload) {
    throw new Error("No user payload found");
  }

  const [updatedTodo] = await db
    .update(todosTable)
    .set({
      title: String(todoData?.title),
      description: String(todoData?.description),
      priority: todoData.priority as "low" | "medium" | "high",
      userId: Number(userPayload?.id),
      completed: todoData?.completed === "true" ? true : false,
      dueDate: todoData?.dueDate ? new Date(String(todoData?.dueDate)) : null,
    })
    .where(
      and(
        eq(todosTable?.id, Number(id)),
        eq(todosTable?.userId, Number(userPayload?.id)),
      ),
    )
    .returning();

  if (!updatedTodo) {
    throw new Error("Cannot update the todo");
  }

  return {
    message: "successfully updated the todo",
    statusCode: 200,
    data: updatedTodo,
  };
};

export const deleteTodo = async (id: string) => {


  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("User not verified to access");
  }

  const userPayload = verifyToken(token);

  if (!userPayload) {
    throw new Error("No user payload found");
  }

  try {
    await db
      .delete(todosTable)
      .where(
        and(
          eq(todosTable?.id, Number(id)),
          eq(todosTable?.userId, Number(userPayload?.id)),
        ),
      );
  } catch (error) {
    throw new Error("Cannot delete the todo");
  }

  return {
    message: "Deleted the todo successfully",
    statusCode: 200,
  };
};
