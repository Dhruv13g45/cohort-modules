import { Router } from "express"
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controller/todo.controller.js"

const router = Router()

router.get("/get-all-todos", getAllTodos)


router.post("/create-todo", createTodo)


router.post("/delete-todo", deleteTodo)


router.post("/edit-todo", updateTodo)


export default router