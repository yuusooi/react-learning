import React from "react";
import TodoItem from './TodoItem'

function TodoList({ todos,deleteTodo,toggleComplete }) {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    completed={todo.completed}
                    deleteTodo={deleteTodo}
                    toggleComplete = {toggleComplete}
                />
            ))}
        </ul>
    )
}

export default TodoList;