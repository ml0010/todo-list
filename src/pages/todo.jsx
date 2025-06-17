import React, { useContext, useState } from 'react'
import { DateContext } from '../contexts/date-context';
import TodoForm from '../components/todo-form';
import TodoListByDate from '../components/todo-list';
import TodoListAll from '../components/todo-list-all';
import '../styles/todo.css';
import { CaretDoubleLeft, CaretDoubleRight, ListChecks, Notepad } from 'phosphor-react';


export const Todo = () => {

    const { dateSelected, setDayBefore, setNextDay } = useContext(DateContext);
    const [ currentPage, setCurrentPage ] = useState('byDate');
   
    return (
        <div className='todo-box'>
            <h1>To Do List</h1>
            <div className='bttns'>
                <button onClick={()=>setCurrentPage('byDate')}><Notepad size={18} />BY DATE</button>
                <button onClick={()=>setCurrentPage('all')}><ListChecks size={18} />SEE ALL</button>
            </div>
            <div className='selected-date'>
                <CaretDoubleLeft size={22} onClick={()=>setDayBefore()} />
                <p>{dateSelected.toDateString()}</p>
                <CaretDoubleRight size={22} onClick={()=>setNextDay()} />
            </div>
            <TodoForm />
            <div className={`todo-list-by-date ${currentPage==='byDate' ? 'active' : ''}`}>
                <TodoListByDate />
            </div>
            <div className={`todo-list-list-all ${currentPage==='all' ? 'active' : ''}`}>
                <TodoListAll />
            </div>
        </div>
    )
}

export default Todo;