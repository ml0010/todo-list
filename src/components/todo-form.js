import React, { useState } from 'react'
import '../styles/todo-form.css';
import { ListPlus } from 'phosphor-react';

export const TodoForm = (props) => {

    const { addTodoToList, date } = props;

    const [ todo, setTodo ] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch('http://localhost:4000/add', {
            method: "post",
            body: JSON.stringify({ todo, date, completed: false }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        addTodoToList(
            {
                id: new Date().getTime(),
                text: todo,
                completed: false
            }
        );
        setTodo('');
        console.log("CONTACT FORM SUBMITTED");
    }    


    return (
        <div className='todoForm'>
            <form onSubmit={handleSubmit}>
                <input value={todo} onChange={(e)=>setTodo(e.target.value)} type='text' placeholder='Enter a task' maxLength='50' required></input>
                <button type='submit'><ListPlus size={45} /></button>
            </form>
        </div>
    )
}
export default TodoForm;