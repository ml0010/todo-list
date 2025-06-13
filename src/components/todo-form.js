import React, { useContext, useState } from 'react'
import '../styles/todo-form.css';
import { ListPlus } from 'phosphor-react';
import { TodoContext } from '../contexts/todo-context';
import { DateContext } from '../contexts/date-context';

export const TodoForm = (props) => {

    const { dateSelected } = useContext(DateContext);    
    const { getTodoList } = useContext(TodoContext);

    const [ todo, setTodo ] = useState('');

    const dateString = dateSelected.toDateString();

    const addNewTodo = async (e) => {
        e.preventDefault();
        let result = await fetch('http://localhost:4000/add', {
            method: "post",
            body: JSON.stringify({ todo, date: dateString, completed: false }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        setTodo('');
        getTodoList();
        console.log("NEW TODO ADDED - " + todo);
    }    

    return (
        <div className='todoForm'>
            <form onSubmit={addNewTodo}>
                <input value={todo} onChange={(e)=>setTodo(e.target.value)} type='text' placeholder='Enter a task' maxLength='50' required></input>
                <button type='submit'><ListPlus size={45} /></button>
            </form>
        </div>
    )
}
export default TodoForm;