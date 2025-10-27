import React from 'react';

function TodoItem({ id,text,completed,deleteTodo,toggleComplete }) {
    const itemStyle = {
        textDecoration: completed ? 'line-through':'none',
        color: completed ? 'gray':'black',
        cursor: "pointer",
    }

    return (
        <li style={itemStyle}>
            <button
                onClick={() => toggleComplete(id)}
            >
                Complete
            </button>
            {text}
            <button
                onClick={() => deleteTodo(id)}
            >
                Delete
            </button>
        </li>
    )
}

export default TodoItem;