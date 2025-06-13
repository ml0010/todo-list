import React, { useContext } from 'react'
import { useState } from 'react';
import { DateContext } from '../contexts/date-context';
import TodoForm from '../components/todo-form';
import TodoList from '../components/todo-list';
import '../styles/todo.css';


export const Todo = () => {

    const { dateSelected } = useContext(DateContext);
   
    return (
        <div className='todo-box'>
            <div className='date-selected'>
                {dateSelected.toDateString()}
            </div>
            <div className='todo-list'>
                <h1>To Do List</h1>
                <TodoForm />
                <TodoList />
            </div>
        </div>
    )
}

export default Todo;