import React,{useState} from 'react';

function TodoForm({addTodo}) {
    const [inputValue,setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        addTodo(inputValue);
        setInputValue("");
    }

    return (
        <form onSubmit={handleSubmit} style={{marginBottom:'20px'}}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='input ur todos here'
                style={{padding:'8px',fontSize:'16px',width:'200px'}}
            />
            <button type='submit' style={{}}>
                Add
            </button>
        </form>
    )
}

export default TodoForm;