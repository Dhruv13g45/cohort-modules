import express from "express"
import { addTodo, deleteTodo, editTodo, getAlltodos, getSingleTodo, todos } from "./store.js"
import "dotenv/config"
import { serve } from "inngest/express"
import { inngest } from "./inngest/inngest-client.js"
import { onTodoCreated } from "./inngest/inngest-function.js"


const app = express()

app.use(express.json())

app.use(
    "/api/inngest",
    serve({
        client: inngest,
        functions: [onTodoCreated],
    })
)

app.post("/create-todo", async (req,res) =>{
    const {title} = req.body

    if(!title){
        return res.status(401).json({
            message: "title is required"
        })
    }

    const newTodo = addTodo(title)

    await inngest.send({
        name: "todo/created",
        data: newTodo
    })

    return res.json({
        message: "created todo successfully",
        statusCode: 200,
        todo: newTodo
    })
} )



app.get("/get-all-todos", (req,res) =>{
    const allTodos = getAlltodos()

    console.log(allTodos)

    
    return res.json({
        message: "fetched all todos",
        statusCode: 200,
        todos: allTodos
    })
})


app.post("/get-single-todo", (req,res)=>{

    const {id} = req.body

    const singleTodo = getSingleTodo(id)

    console.log(singleTodo)

    return res.json({
        message: "got single todo",
        todo: singleTodo
    })
})

app.post("/update-todo", (req,res) =>{
    const {id, title} = req.body

    const updatedTodo = editTodo(title, id)

     return res.json({
        message: "edited todo",
        statusCode: 200,
        todo: updatedTodo
    })
})


app.post("/delete-todo", (req,res) =>{

    const {id} = req.body

    const todo = deleteTodo(id)

     return res.json({
        message: "deleted todo successfully",
        statusCode: 200,
        todo: todo
    })
})


app.listen(8000, ()=>{
    console.log("server started")
})