import React, { useState } from 'react'
import '../styles/todo-form.css';

export const TodoForm = (props) => {

    const { addTodoToList } = props;

    const [ todo, setTodo ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodoToList(
            {
                id: new Date().getTime(),
                text: todo,
                completed: false
            }
        );
        setTodo('');
    };

    return (
        <div className='todoForm'>
            <form onSubmit={handleSubmit}>
                <input value={todo} onChange={(e)=>setTodo(e.target.value)} type='text' placeholder='Enter a task' required></input>
                <button type='submit'>ADD</button>
            </form>
        </div>
    )
}
export default TodoForm;