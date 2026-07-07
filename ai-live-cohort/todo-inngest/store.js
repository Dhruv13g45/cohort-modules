export const todos = []

export const auditLogs = []

let nextId = 1

export const addTodo = (title) =>{

    const todo = { id: nextId++, title, completed: false }

    todos.push(todo)

    return todo
}


export const getAlltodos = () =>{
    return todos
}


export const getSingleTodo = (id) =>{
    const numId = Number(id)
    return todos.find((todo) => todo.id === numId)
}


export const editTodo = (title, id) =>{
    const numId = Number(id)
    const updatedTodo = getSingleTodo(numId)
    if(!updatedTodo) return null

    updatedTodo.title = title

    return updatedTodo
}


export const deleteTodo = (id) =>{
    const numId = Number(id)
    const index = todos.findIndex((todo) => todo.id === numId)
    if (index === -1) return null

    return todos.splice(index, 1)[0]
}