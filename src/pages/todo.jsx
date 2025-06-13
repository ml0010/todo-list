import React, { useContext } from 'react'
import { DateContext } from '../contexts/date-context';
import TodoForm from '../components/todo-form';
import TodoList from '../components/todo-list';
import '../styles/todo.css';
import { CaretDoubleLeft, CaretDoubleRight } from 'phosphor-react';


export const Todo = () => {

    const { dateSelected, setDayBefore, setNextDay  } = useContext(DateContext);
   
    return (
        <div className='todo-box'>
            <h1>To Do List</h1>
            <div className='selected-date'>
                <CaretDoubleLeft size={23} onClick={()=>setDayBefore()} />
                <p>{dateSelected.toDateString()}</p>
                <CaretDoubleRight size={23} onClick={()=>setNextDay()} />
            </div>
            <div className='todo-list'>
                <TodoForm />
                <TodoList />
            </div>
        </div>
    )
}

export default Todo;