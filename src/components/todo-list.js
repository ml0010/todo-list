import React, { useContext, useEffect, useRef, useState } from 'react'
import '../styles/todo-list.css'
import { Backspace, Cactus, FloppyDisk, Pencil, Trash } from 'phosphor-react';
import { TodoContext } from '../contexts/todo-context';
import { DateContext } from '../contexts/date-context';

export const TodoList = () => {


    const { todos, getTodoList, editItemId, editText, setEditText, isFetching, setIsFetching, deleteTodo, deleteTodoAll, handleClickCheckbox, handleEdit, handleSubmitEdit, resetEdit} = useContext(TodoContext);
    const { dateSelected } = useContext(DateContext);
    

    const todoToday = todos.filter((todo) => todo.date === dateSelected.toDateString());
    
    useEffect(() => {
        setTimeout(function () {
            //console.log("Delayed for 0.2 second."); 
            setIsFetching(false);
        }, 200);
    }, [isFetching, setIsFetching]);

    useEffect(() => {
        setIsFetching(true);
        getTodoList();
    }, []);

    const modalRef = useRef();
    
    const handleClickOutside = (e) => {
        console.log('click from list-day');
        e.stopPropagation();
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            resetEdit();
            console.log(e.target);
        }
    };

    useEffect(() => {
        if (editItemId) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [editItemId]);

    const handleDeleteAll = () => {
        const date = dateSelected.toDateString();
        if(window.confirm(`Your list of ${date} will be deleted permanantly.`)) {
            deleteTodoAll(date);
        }
    }

    return (
            <div className='todo-list'> 
            {!isFetching? 
                <>
                {todoToday.map((todo, index) => 
                    <div className='todo' key={index}>
                        <div className='todo-text'>
                            <input className='checkbox' type='checkbox' checked={todo.completed} onChange={()=>handleClickCheckbox(todo)}></input>
                            <div className='inputbox' ref={modalRef}>
                                {todo._id === editItemId ? 
                                    <form onSubmit={()=>handleSubmitEdit(todo._id)}>
                                        <input value={editText} onChange={(e)=>setEditText(e.target.value)} maxLength='50' type='text' name='todoEdited' />
                                    </form> :
                                    <>{todo.todo}</>
                                }
                            </div>
                        </div>
                        <div className='todo-actions'>
                            {todo._id === editItemId ? 
                                <FloppyDisk size={23} onClick={()=>handleSubmitEdit(todo._id)} /> : 
                                <Pencil size={23} onClick={()=>handleEdit(todo)} />
                            }
                            <Backspace size={23} onClick={()=>deleteTodo(todo._id)} />
                        </div>
                    </div>)}
                    {todoToday.length? 
                        <div className='deleteAllBttn' onClick={handleDeleteAll}>
                            <Trash size={20} />DELETE ALL
                        </div> : 
                        <div className='emptyList'>
                            <Cactus size={20} />
                            <p>NO PLANS</p>
                        </div>
                    }
                </> : <div className='loader-wrapper'><div className="loader"></div></div> }
        </div>
    )
}
export default TodoList;