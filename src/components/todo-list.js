import React, { useContext, useEffect } from 'react'
import '../styles/todo-list.css'
import { Backspace, Cactus, FloppyDisk, Pencil, Trash } from 'phosphor-react';
import { TodoContext } from '../contexts/todo-context';
import { DateContext } from '../contexts/date-context';
import DataLoaderCircle from './data-loader';

export const TodoList = () => {

    const { todos, getTodoList, editItemId, editText, setEditText, isDataFetched, setIsDataFetched, deleteTodo, deleteTodoAll, handleClickCheckbox, handleEdit, handleSubmitEdit, inputRef} = useContext(TodoContext);
    const { dateSelected } = useContext(DateContext);
    
    const todoToday = todos.filter((todo) => todo.date === dateSelected.toDateString());

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
                {todoToday.map((todo, index) => 
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
                </> : <DataLoaderCircle /> }
        </div>
    )
}
export default TodoList;