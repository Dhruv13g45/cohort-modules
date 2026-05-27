import express from "express";
import todoRouter from "./routes/todo.routes.js";
function createServerApplication() {
    const app = express();
    app.use(express.json());
    app.use("/todo", todoRouter);
    return app;
}
export default createServerApplication;
//# sourceMappingURL=index.js.map