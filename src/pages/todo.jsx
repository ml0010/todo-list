import React from 'react'
import { useState } from 'react';
import TodoForm from '../components/todo-form';
import TodoList from '../components/todo-list';
import '../styles/todo.css';


export const Todo = () => {

    const [ todos, setTodos ] = useState([]);
    
    const addTodoToList = (newTodo) => {
        setTodos([...todos, newTodo]);
    };
    const handleDelete = (id) => {
        let updateTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updateTodos);
    };
    const handleSubmitEdit = (newTodo) => {
        const todoIndex = todos.findIndex((todo) => todo.id === newTodo.id);
        if (todoIndex !== -1) {
            const updateTodos = [...todos];
            updateTodos[todoIndex] = newTodo;
            setTodos(updateTodos);
        }
    };

    return (
        <div className='todo-box'>
            <h1>To Do List</h1>
            <TodoForm addTodoToList={addTodoToList} />
            <TodoList todos={todos} deleteTodo={handleDelete} editTodo={handleSubmitEdit}/>
        </div>
    )
}

export default Todo;