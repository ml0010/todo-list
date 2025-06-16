import React, { useContext, useEffect, useRef, useState } from 'react'
import '../styles/todo-list.css'
import { Backspace, Cactus, FloppyDisk, Pencil, Trash } from 'phosphor-react';
import { TodoContext } from '../contexts/todo-context';
import { DateContext } from '../contexts/date-context';

export const TodoList = () => {


    const { todos, getTodoList, isFetching, setIsFetching, deleteTodo, deleteTodoAll, editTodo, tickOff, unTick } = useContext(TodoContext);
    const { dateSelected } = useContext(DateContext);
    
    const [ editItemId, setEditItemId ] = useState(null);
    const [ editText, setEditText ] = useState('');
    
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
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setEditItemId(null);
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

    const handleEdit = (todo) => {
        setEditItemId(todo._id);
        setEditText(todo.todo);
    };

    const handleSubmitEdit = (id) => {
        setEditItemId(null);
        editTodo(id, editText);
    };
    
    const handleClickCheckbox = (todo) => {
        if(todo.completed) {
            unTick(todo._id);
        } else {
            tickOff(todo._id);
        }
    };

    const handleDeleteAll = () => {
        if(window.confirm(`Your list of ${dateSelected.toDateString()} will be deleted permanantly.`)) {
            deleteTodoAll(dateSelected);
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