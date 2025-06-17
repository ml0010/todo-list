import React, { useContext, useEffect, useRef, useState } from 'react'
import { TodoContext } from '../contexts/todo-context';
import '../styles/todo-list-all.css'
import { Backspace, FloppyDisk, Pencil } from 'phosphor-react';

export const TodoListAll = () => {

    const { todos, todosDatesList, getTodoList, isFetching, setIsFetching, deleteTodo, deleteTodoAll, editTodo, tickOff, unTick, handleClickCheckbox } = useContext(TodoContext);

    const todoDatesSortedList = todosDatesList.map((date) => new Date(date)).sort((a,b) => a < b ? -1 : a > b ? 1 : 0).map((date) => date.toDateString());
    //console.log(todoDatesSortedList);

    const [ editItemId, setEditItemId ] = useState(null);
    const [ editText, setEditText ] = useState('');

    const modalRef = useRef();
    
    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setEditItemId(null);
            setEditText('');
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
    return (
        <div className='todo-list-all'>
            {todoDatesSortedList.map((date, index) => 
            <div className='todo-by-date' key={index}>
                <h2>{date}</h2>
                {todos.map((todo, index) => <>
                    {date === todo.date ? <>
                    <div className='todo' key={index}>
                        <div  className='todo-text'>
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
                    </div>
                </> : <></>}
                </>
                )}
            </div>
            )}
        </div>
    )
}
export default TodoListAll;