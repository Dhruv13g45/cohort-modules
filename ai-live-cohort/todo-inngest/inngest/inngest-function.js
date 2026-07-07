import { inngest } from "./inngest-client.js";
import { auditLogs } from "../store.js";

export const onTodoCreated = inngest.createFunction(
    {
        id: 'on-todo-created',
        triggers: [{ event: 'todo/created' }]
    },
    async ( { event, step } ) => {
        await step.run( 'audit', async () => {
            auditLogs.push( {
                action: 'created',
                todoId: event.data.todo?.id,
                title: event.data.todo?.title,
                timestamp: new Date().toString(),
            } )
            return {
                success: true,
            }
        } )
    }
)