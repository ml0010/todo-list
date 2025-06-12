import React, { useState } from 'react'
import '../styles/todo-form.css';
import { ListPlus } from 'phosphor-react';

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
                <input value={todo} onChange={(e)=>setTodo(e.target.value)} type='text' placeholder='Enter a task' maxlength='50' required></input>
                <button type='submit'><ListPlus size={45} /></button>
            </form>
        </div>
    )
}
export default TodoForm;