import express from "express"
import type { Application } from "express"
import todoRouter from "./routes/todo.routes.js"

function createServerApplication(): Application{

    const app = express()

    app.use(express.json())
    app.use("/todo", todoRouter)

    return app
}

export default createServerApplication;