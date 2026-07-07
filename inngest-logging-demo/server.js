import express from "express"
import 'dotenv/config'
import { addTodo, deleteTodo, getAllTodo, getSingleTodo, updateTodo } from "./todo-service.js"

import { serve } from "inngest/express"
import { inngest } from "./inngest/inngest-client.js"
import { onTodoCreated, onTodoDelete, onTodoUpdate } from "./inngest/inngest-function.js"




const app = express()

// dotenv.config()

app.use(express.json())
console.log(process.env.PORT)
console.log(process.env.INNGEST_DEV)


app.use(
    "/api/inngest",
    serve({
        client: inngest,
        functions: [onTodoCreated, onTodoDelete, onTodoUpdate],
    })
)

app.post("/addTodo", async(req, res) =>{

    const {title, description} = req.body

    const todo = addTodo(title, description)

    if(!todo){
        return res.json({
            message: "Error in creating todo",
            statusCode:500,
            data: null
        })
    }

    await inngest.send({
        name: "todo.created",
        data: {todo},
    })

    return res.status(200).json({
        message: "Created todo successfully",
        statusCode: 200,
        data: todo,
    })
})




app.get("/getAllTodo", async(req, res) =>{

    const allTodos = getAllTodo()

    if(allTodos.length < 1){
        return res.status(500).json({
            message: "Error in deleting the todo"
        })
    }

    return res.status(200).json({
        message: "Fetched all todos successfully",
        statusCode: 200,
        data: {allTodos}
    })
})




app.get("/getSingleTodo/:id", async(req, res) =>{

    const id = req.params.id

    const todo = getSingleTodo(id)

    if(!todo){
        return res.status(500).json({
            message: "Cannot get single todo",
            statusCode: 500,
            data: null
        })
    }

    return res.status(200).json({
        message: "Got the single todo",
        statusCode: 200,
        data: todo
    })
})



app.patch("/updateTodo/:id", async(req, res) =>{
    const id = req.params.id

    const {title, description} = req.body

    const todo = updateTodo(id, title, description)

    if(!todo){
        return res.status(500).json({
            message: "Cannot update the todo",
            statusCode: 500,
            data: null
        })
    }

    await inngest.send({
        name: "todo.updated",
        data: {todo}
    })

    return res.status(200).json({
        message: "Updated the todo",
        statusCode: 200,
        data: todo
    })
})



app.delete("/deleteTodo/:id", async(req, res) =>{

    const id = req.params.id

    const todo = deleteTodo(id)

    await inngest.send({
        name:"todo.deleted",
        data: {todo}
    })

    return res.status(200).json({
        message: "Deleted the todo",
        statusCode: 200,
        data: todo
    })
})



const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log("Server started")
})