export const todos = []  // for express and our app reference

export const auditLogs = [] // for the inngest logs


let index = 0

export const addTodo = (title, description) =>{

    const todo = {id: index++, title, description}

    if (!todo){
        return "Cannot create a todo"
    }

    todos.push(todo) // could be db call

    return todo
}

export const getAllTodo = () =>{
    return todos
}

export const getSingleTodo = (id) =>{

    return todos.find((todo) => todo.id === Number(id))
}


export const updateTodo = (id, title, description) =>{

    const todo = getSingleTodo(id)


    todo.title = title
    todo.description = description

    return todo
}


export const deleteTodo = (id) => {
  const index = todos.findIndex(
    (todo) => todo.id === Number(id)
  );

  if (index === -1) return null;

  return todos.splice(index, 1)[0];
};