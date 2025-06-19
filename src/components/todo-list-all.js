import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../contexts/todo-context';
import { DateContext } from '../contexts/date-context';
import '../styles/todo-list-all.css'
import { Trash } from 'phosphor-react';
import DataLoaderCircle from './data-loader';
import EmptyList from './empty-list';
import TodoOutput from './todo-output';

export const TodoListAll = () => {

    const { todos, todosDatesList, isDataFetched, deleteTodoAll } = useContext(TodoContext); 
    const { today, dayBefore, dateSelected, setDateSelected, setCalendarDate, scrollScreen } = useContext(DateContext);

    const [ isPastShown, setIsPastShown ] = useState(false);

    const todoDatesSorted = todosDatesList.map((date) => new Date(date)).sort((a,b) => a < b ? -1 : a > b ? 1 : 0);
    const todoDatesSortedString = todoDatesSorted.map((date) => date.toDateString());

    useEffect(() => {
        if(todos.length) {
            //console.log('scroll from the list');
            scrollScreen(todoDatesSorted);
        }
    }, [todos, dateSelected, scrollScreen]);

    useEffect(() => {
        if(!isPastShown) {
            if(dateSelected < today) {
                //console.log('now past is shown');
                setIsPastShown(true);
            }
        }
    }, [dateSelected]);

    const handleDeleteAll = (date) => {
        if(window.confirm(`Your list of ${date} will be deleted permanantly.`)) {
            deleteTodoAll(date);
        }
    }
    const handleTodoClick = (date) => {
        const dateFormat = new Date(date);
        setDateSelected(dateFormat);
        setCalendarDate(dateFormat);
    };

    return (
        <div className='todo-list-all'>
            {isDataFetched? 
                <>
                <button onClick={()=>setIsPastShown(!isPastShown)} className='pastTodoBttn'>{!isPastShown ? 'Open Past' : 'Close Past'}</button>
                {todos.length? 
                    <>
                    {todoDatesSortedString.map((date, index) => 
                    <div className={`todo-by-date ${dayBefore > todoDatesSorted[index] ? 'past' : ''} ${!isPastShown? 'hidden' : ''}`} id={date} key={index}>
                        <h2 onClick={()=>handleTodoClick(date)}>{date}</h2>
                        <div className='deleteAllBttn' onClick={()=>handleDeleteAll(date)}>
                            DELETE ALL<Trash size={16} />
                        </div>
                        {todos.map((todo, index) => <div key={index}>
                        {date === todo.date ? <TodoOutput todo={todo}/> : <></>}
                        </div>)}
                    </div>)}
                    </> 
                    : <EmptyList />}
                </> 
                : <DataLoaderCircle />}
        </div>
    )
}
export default TodoListAll;