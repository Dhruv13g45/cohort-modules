import { verifyToken } from "@/app/libs/auth";
import { db } from "@/app/src";
import { todosTable } from "@/app/src/db/schema";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

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

  const allTodos = await db.select().from(todosTable);

  if (allTodos.length === 0) {
    return "No todos exists in the table";
  }

  return {
    statusCode: 200,
    message: "Fetched all todos",
    todos: allTodos,
  };
};

export const getSingleTodo = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("User not verified to access");
  }

  const userPayload = verifyToken(token);

  if (!userPayload) {
    throw new Error("No user payload found");
  }

  const singleTodo = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable?.id, Number(id)));

  if (!singleTodo) {
    throw new Error("couldn't find any todo with this id");
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

  const newTodo = await db.insert(todosTable).values([
    {
      title: String(todoData?.title),
      description: String(todoData?.description),
    },
  ]);

  if (!newTodo) {
    throw new Error("Error creating a todo");
  }

  return {
    message: "Created a todo successfully",
    statusCode: 200,
    data: newTodo,
  };
};

export const updateTodo = async (
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
  formData: FormData,
) => {
  const { id } = await params;

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
    })
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

export const deleteTodo = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

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
    await db.delete(todosTable).where(eq(todosTable?.id, Number(id)))
  } catch (error) {
    throw new Error("Cannot delete the todo")
  }


  return {
    message: "Deleted the todo successfully",
    statusCode: 200,
  }

};
