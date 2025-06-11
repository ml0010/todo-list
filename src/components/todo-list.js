import React, { useState } from 'react'
import '../styles/todo-list.css'

export const TodoList = (props) => {
    const [ editItemId, setEditItemId ] = useState(null);
    const [ editText, setEditText ] = useState('');

    const handleDelete = (todoId) => {
        props.deleteTodo(todoId);
        setEditItemId(null);
    }
    const handleEdit = (todo) => {
        setEditItemId(todo.id);
        setEditText(todo.text);
    };
    const handleSubmitEdit = (todo) => {
        setEditItemId(null);
        todo.text = editText;
        props.editTodo(todo);
    };

    return (
        props.todos.map((todo) =>
            <div key={todo.id} className='todo'>
                <div className='todo-text'>
                    <input type='checkbox'></input>
                    <div className='inputbox'>
                    {todo.id === editItemId ? 
                        <form onSubmit={()=>handleSubmitEdit(todo)}>
                            <input value={editText} onChange={(e)=>setEditText(e.target.value)} type='text'></input>
                        </form> :
                        <>{todo.text}</>
                    }
                    </div>
                </div>
                <div className='todo-actions'>
                    {todo.id === editItemId ? 
                        <button onClick={()=>handleSubmitEdit(todo)}>Submit Edits</button> : 
                        <button onClick={()=>handleEdit(todo)}>Edit</button>
                    }
                    <button onClick={()=>handleDelete(todo.id)}>Delete</button>
                </div>
            </div>
        )
    )
}
export default TodoList;