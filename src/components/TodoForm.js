import React, { useState } from 'react'

export const TodoForm = (props) => {

    const [ todo, setTodo ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(
            {
                id: new Date().getTime(),
                text: todo,
                completed: false
            }
        );
        setTodo('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={todo} onChange={(e)=>setTodo(e.target.value)} type='text' placeholder='Enter a task' required></input>
        </form>
    )
}
export default TodoForm;