import { inngest } from "./inngest-client.js";
import { auditLogs } from "../todo-service.js";
import { step } from "inngest";

export const onTodoCreated = inngest.createFunction(
  {
    id: "on-todo-creation",
    triggers: [{ event: "todo.created" }],
  },
  async ({ event, step }) => {
    await step.run("audit", async () => {
      auditLogs.push({
        action: "created",
        todoId: event.data.todo.id,
        todoTitle: event.data.todo.title,
        todoDescription: event.data.todo.description,
      });

      return {
        success: true,
      };
    });
  },
);

export const onTodoUpdate = inngest.createFunction(
  {
    id: "on-todo-update",
    triggers: [{ event: "todo.updated" }],
  },
  async ({ event, step }) => {
    return await step.run("append-update-audit-log", async () => {
      const log = {
        action: "updated",
        todoId: event.data.todo.id,
        title: event.data.todo.title,
        description: event.data.todo.description,
        timestamp: new Date().toISOString(),
      };

      auditLogs.push(log);

      return {
        success: true,
        data: log,
      };
    });
  },
);

export const onTodoDelete = inngest.createFunction(
  {
    id: "on-todo-delete",
    triggers: [{ event: "todo.deleted" }],
  },
   async ({ event, step }) => {
    return await step.run("append-delete-audit-log", async () => {
      const log = {
        action: "deleted",
        todoId: "",
        title: "",
        description: "",
        timestamp: new Date().toISOString(),
      };

      auditLogs.push(log);

      return {
        success: true,
        data: log,
      };
    });
  }
);
