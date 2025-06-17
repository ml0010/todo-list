import React, { useContext } from 'react'
import { TodoContext } from '../contexts/todo-context';
import { DateContext } from '../contexts/date-context';
import '../styles/todo-list-all.css'
import { Backspace, FloppyDisk, Pencil, Trash } from 'phosphor-react';

export const TodoListAll = () => {

    const { todos, todosDatesList, editItemId, editText, setEditText, deleteTodo, deleteTodoAll, handleClickCheckbox, handleEdit, handleSubmitEdit, resetEdit } = useContext(TodoContext); 
    const { setDateSelected } = useContext(DateContext);

    const todoDatesSortedList = todosDatesList.map((date) => new Date(date)).sort((a,b) => a < b ? -1 : a > b ? 1 : 0).map((date) => date.toDateString());

/*
    const handleClickOutside = (e) => {
        console.log('closing');
        console.log(e.target);
        if (allListRef.current && !allListRef.current.contains(e.target)) {
            resetEdit();
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

*/
    const handleDeleteAll = (date) => {
        if(window.confirm(`Your list of ${date} will be deleted permanantly.`)) {
            deleteTodoAll(date);
        }
    }
    const handleTodoClick = (date) => {
        const dateFormat = new Date(date);
        setDateSelected(dateFormat);
    };

    return (
        <div className='todo-list-all'>
            {todoDatesSortedList.map((date, index) => 
            <div className='todo-by-date' id={date} key={index} onClick={()=>handleTodoClick(date)}>
                <h2>{date}</h2>
                <div className='deleteAllBttn' onClick={()=>handleDeleteAll(date)}>
                    DELETE ALL<Trash size={16} />
                </div>
                {todos.map((todo, index) => <>
                    {date === todo.date ? 
                    <div className='todo' key={index}>
                        <div  className='todo-text'>
                            <input className='checkbox' type='checkbox' checked={todo.completed} onChange={()=>handleClickCheckbox(todo)}></input>
                            <div className='inputbox'>
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
            )}
        </div>
    )
}
export default TodoListAll;