import React, { useContext, useEffect } from 'react'
import { TodoContext } from '../contexts/todo-context';
import { DateContext } from '../contexts/date-context';
import '../styles/todo-list-all.css'
import { Backspace, FloppyDisk, Pencil, Trash } from 'phosphor-react';
import DataLoaderCircle from './data-loader';

export const TodoListAll = () => {

    const { todos, todosDatesList, editItemId, editText, setEditText, isDataFetched, deleteTodo, deleteTodoAll, handleClickCheckbox, handleEdit, handleSubmitEdit, inputRef } = useContext(TodoContext); 
    const { dateSelected, setDateSelected, setCalendarDate, scrollScreen } = useContext(DateContext);

    const todoDatesSortedList = todosDatesList.map((date) => new Date(date)).sort((a,b) => a < b ? -1 : a > b ? 1 : 0).map((date) => date.toDateString());

    useEffect(() => {
        console.log('scroll from the list');
        scrollScreen(todoDatesSortedList.map((date) => new Date(date)));
    }, [todos, dateSelected, scrollScreen]);

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
            {isDataFetched? <>
                {todoDatesSortedList.map((date, index) => 
                <div className='todo-by-date' id={date} key={index}>
                    <h2 onClick={()=>handleTodoClick(date)}>{date}</h2>
                    <div className='deleteAllBttn' onClick={()=>handleDeleteAll(date)}>
                        DELETE ALL<Trash size={16} />
                    </div>
                    {todos.map((todo, index) => <>
                        {date === todo.date ? 
                        <div className='todo' key={index}>
                            <div className='todo-text'>
                                <input className='checkbox' type='checkbox' checked={todo.completed} onChange={()=>handleClickCheckbox(todo)}></input>
                                <div className='inputbox'>
                                    {todo._id === editItemId ? 
                                        <form onSubmit={()=>handleSubmitEdit(todo._id)}>
                                            <input ref={inputRef} value={editText} onChange={(e)=>setEditText(e.target.value)} maxLength='50' type='text' name='todoEdited' />
                                        </form> :
                                        <>{todo.todo}</>
                                    }
                                </div>
                            </div>
                            <div className='todo-actions'>
                                {todo._id === editItemId ? 
                                    <FloppyDisk size={20} onClick={()=>handleSubmitEdit(todo._id)} /> : 
                                    <Pencil size={20} onClick={()=>handleEdit(todo)} />
                                }
                                <Backspace size={20} onClick={()=>deleteTodo(todo._id)} />
                            </div>
                        </div>
                    : <></>}
                    </>
                    )}
                </div>
                )}</>
            : <DataLoaderCircle />}
        </div>
    )
}
export default TodoListAll;