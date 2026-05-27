import type { Request, Response } from "express";
declare const createTodo: (req: Request<{}, {}, {
    title: string;
    content: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getAllTodos: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const updateTodo: (req: Request<{
    id: string;
}, {}, {
    content: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const deleteTodo: (req: Request<{
    id: string;
}>, res: Response) => Promise<Response<any, Record<string, any>>>;
export { createTodo, deleteTodo, updateTodo, getAllTodos, };
//# sourceMappingURL=todo.controller.d.ts.map