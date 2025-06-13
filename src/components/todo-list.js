import React, { useContext, useEffect, useState } from 'react'
import '../styles/todo-list.css'
import { FloppyDisk, Pencil, Trash } from 'phosphor-react';
import { TodoContext } from '../contexts/todo-context';
import { DateContext } from '../contexts/date-context';

export const TodoList = () => {


    const { todos, setTodos, getTodoList } = useContext(TodoContext);
    const { dateSelected } = useContext(DateContext);
    const todoToday = todos.filter((todo) => todo.date === dateSelected.toDateString());
    
    const [ editItemId, setEditItemId ] = useState(null);
    const [ editText, setEditText ] = useState('');
    
    useEffect(() => {
        getTodoList();
    }, []);

    const deleteTodo = async (id) => {
        console.log("DELETE TODO")
        try {
            const response = await fetch(`http://localhost:4000/delete/${id}`, {mode:'cors'});
            console.log(response);
            //setTodoListLoaded(false);
            getTodoList();
        }
        catch (err) {
            console.log(err);
        }
    }
    

    const editTodo = async (id, todo) => {
        console.log("TODO UPDATE");
        try {
            const response = await fetch(`http://localhost:4000/edit/${id}/${todo}`, {mode:'cors'});
            console.log(response);
            getTodoList();
        }
        catch (err) {
            console.log(err);
        }
    }

    const tickOff = async (id) => {
        console.log("TODO UPDATE");
        try {
            const response = await fetch(`http://localhost:4000/completed/${id}/true`, {mode:'cors'});
            console.log(response);
            getTodoList();
        }
        catch (err) {
            console.log(err);
        }
    }
    const unTick = async (id) => {
        console.log("TODO UPDATE");
        try {
            const response = await fetch(`http://localhost:4000/completed/${id}/false`, {mode:'cors'});
            console.log(response);
            getTodoList();
        }
        catch (err) {
            console.log(err);
        }
    }


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

    return (
            <div>{todoToday.map((todo, index) => 
                <div className='todo' key={index}>
                    <div className='todo-text'>
                        <input className='checkbox' type='checkbox' checked={todo.completed} onChange={()=>handleClickCheckbox(todo)}></input>
                        <div className='inputbox'>
                            {todo._id === editItemId ? 
                                <form onSubmit={()=>handleSubmitEdit(todo._id)}>
                                    <input value={editText} onChange={(e)=>setEditText(e.target.value)} maxLength='50' type='text' name='todoEdited'></input>
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
                        <Trash size={23} onClick={()=>deleteTodo(todo._id)} />
                    </div>
                </div>)}
        </div>
    )
}
export default TodoList;