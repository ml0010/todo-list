import React, { useContext, useEffect } from 'react'
import '../styles/todo-list.css'
import { Trash } from 'phosphor-react';
import { TodoContext } from '../contexts/todo-context';
import { DateContext } from '../contexts/date-context';
import DataLoaderCircle from './data-loader';
import EmptyList from './empty-list';
import TodoOutput from './todo-output';

export const TodoList = () => {

    const { todos, getTodoList, isDataFetched, setIsDataFetched, deleteTodoAll } = useContext(TodoContext);
    const { dateSelected } = useContext(DateContext);
    
    const todoSelected = todos.filter((todo) => todo.date === dateSelected.toDateString());

    useEffect(() => {
        if(!isDataFetched) {
            setIsDataFetched(true);
            getTodoList();
        }
    }, [isDataFetched, setIsDataFetched, getTodoList]);

    const handleDeleteAll = () => {
        const date = dateSelected.toDateString();
        if(window.confirm(`Your list of ${date} will be deleted permanantly.`)) {
            deleteTodoAll(date);
        }
    }

    return (
        <div className='todo-list'>
            {isDataFetched? 
                <>
                {todoSelected.map((todo, index) => <div key={index}><TodoOutput todo={todo} /></div>)}   
                {todoSelected.length? 
                    <div className='deleteAllBttn' onClick={handleDeleteAll}>
                        <Trash size={20} />DELETE ALL
                    </div> : 
                    <EmptyList />
                }
                </> 
            : <DataLoaderCircle /> }
        </div>
    )
}
export default TodoList;