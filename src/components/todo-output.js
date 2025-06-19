import React, { useContext } from 'react'
import { TodoContext } from '../contexts/todo-context';
import { Backspace, FloppyDisk, Pencil } from 'phosphor-react';

function TodoOutput(props) {

    const { editItemId, editText, setEditText, deleteTodo, handleClickCheckbox, handleEdit, handleSubmitEdit, inputRef} = useContext(TodoContext);
    const { todo } = props;

    return (
        <div className='todo'>
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
        </div>
    )
}

export default TodoOutput;