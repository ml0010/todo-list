import React, { useState } from 'react'
import '../styles/todo-list.css'
import { FloppyDisk, Pencil, Trash } from 'phosphor-react';

export const TodoList = (props) => {

    const { todos, deleteTodo, editTodo, date } = props;
    
    const [ editItemId, setEditItemId ] = useState(null);
    const [ editText, setEditText ] = useState('');



    const handleDelete = (todoId) => {
        deleteTodo(todoId);
        setEditItemId(null);
    }
    const handleEdit = (todo) => {
        setEditItemId(todo.id);
        setEditText(todo.text);
    };
    const handleSubmitEdit = (todo) => {
        setEditItemId(null);
        todo.text = editText;
        editTodo(todo);
    };

    return (
        todos.map((todo) =>
            <div key={todo.id} className='todo'>
                <div className='todo-text'>
                    <input className='checkbox' type='checkbox'></input>
                    <div className='inputbox'>
                    {todo.id === editItemId ? 
                        <form onSubmit={()=>handleSubmitEdit(todo)}>
                            <input value={editText} onChange={(e)=>setEditText(e.target.value)} maxLength='50' type='text'></input>
                        </form> :
                        <>{todo.text}</>
                    }
                    </div>
                </div>
                <div className='todo-actions'>
                    {todo.id === editItemId ? 
                        <FloppyDisk size={23} onClick={()=>handleSubmitEdit(todo)} /> : 
                        <Pencil size={23} onClick={()=>handleEdit(todo)} />
                    }
                    <Trash size={23} onClick={()=>handleDelete(todo.id)} />
                </div>
            </div>
        )
    )
}
export default TodoList;