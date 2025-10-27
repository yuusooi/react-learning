import React,{useState,useEffect} from "react";
import TodoList from "./components/TodoList"
import TodoForm from "./components/TodoForm"

function App() {
  const initialTodos = [
    {id: 1, text: 'learning React', completed: false}, 
    {id: 2, text: 'practice', completed: true}
  ];

  const [todos,setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  })

  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos])

  function addTodo(text) {
    const newTodo = {
      id:Date.now(),
      text,
      completed:false
    }
    setTodos([...todos,newTodo]);
  }

  function deleteTodo(id) {
    // console.log("要删除的 id:", id);
    // console.log("当前 todos:", todos)
    const newTodo = todos.filter((todo) => todo.id !==id);
    setTodos(newTodo);
  }

  function toggleComplete(id) {
    const newTodo = todos.map((todo) => {
      if(todo.id === id) {
        return {...todo,completed:!todo.completed}
      }
      return todo;
    });
    setTodos(newTodo);
  }

  return (
    <div>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
    </div>
  )
}

export default App;
