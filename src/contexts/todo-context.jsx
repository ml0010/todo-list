import React, { createContext, useRef, useState } from 'react'

export const TodoContext = createContext(null);

export const TodoContextProvider = (props) => {

    const [ todos, setTodos ] = useState([]);
    const [ todoDates, setTodoDates ] = useState([]);
    const [ isDataFetched, setIsDataFetched ] = useState(false);    
    const [ editItemId, setEditItemId ] = useState(null);
    const [ editText, setEditText ] = useState('');
    const [ search, setSearch ] = useState(false);


    const todosDatesList = [...new Set(todos.map((todo)=> {
        return todo.date;
    }))];

    const inputRef = useRef();

    const getTodoList = async () => {
        setIsDataFetched(false);
        console.log("GET TODO LIST");
        try {
            const response = await fetch(`https://todo-list-ksyh.onrender.com/list`, {mode:'cors'});
            const data = await response.json();
            if(data === null) { 
                console.log("No todo list");
            } else {
                setTodos(()=>[...data]);
                setIsDataFetched(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const deleteTodo = async (id) => {
        //console.log("DELETE TODO")
        try {
            const response = await fetch(`https://todo-list-ksyh.onrender.com/delete/${id}`, {mode:'cors'});
            console.log(response);
            getTodoList();
        }
        catch (err) {
            console.log(err);
        }
    }

    const deleteTodoAll = async (date) => {
        console.log("DELETE ALL TODO")
        try {
            const response = await fetch(`https://todo-list-ksyh.onrender.com/deleteall/${date}`, {mode:'cors'});
            console.log(response);
            getTodoList();
        }
        catch (err) {
            console.log(err);
        }
    }

    const editTodo = async (id, todo) => {
        console.log("TODO UPDATE - " + todo);
        try {
            const response = await fetch(`https://todo-list-ksyh.onrender.com/edit/${id}/${todo}`, {mode:'cors'});
            response.json(response);
            getTodoList();
        }
        catch (err) {
            console.log(err);
        }
    }

    const tickOff = async (id) => {
        //console.log("TICK");
        try {
            const response = await fetch(`https://todo-list-ksyh.onrender.com/completed/${id}/true`, {mode:'cors'});
            await response.json();
            //console.log(response);
            getTodoList();
        }
        catch (err) {
            console.log(err);
        }
    }
    const unTick = async (id) => {
        //console.log("UNTICK");
        try {
            const response = await fetch(`https://todo-list-ksyh.onrender.com/completed/${id}/false`, {mode:'cors'});
            await response.json();
            //console.log(response);
            getTodoList();
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleClickCheckbox = (todo) => {
        if(todo.completed) {
            unTick(todo._id);
        } else {
            tickOff(todo._id);
        }
    };

    const resetEdit = () => {
        setEditItemId(null);
        setEditText('');
    };

    const handleEdit = (todo) => {
        setEditItemId(todo._id);
        setEditText(todo.todo);
    };

    const handleSubmitEdit = (id) => {
        editTodo(id, editText);
        resetEdit();
    };

    const contextValue = { todos, setTodos, todoDates, todosDatesList, setTodoDates, inputRef, editItemId, setEditItemId, editText, setEditText, search, setSearch, isDataFetched, setIsDataFetched, getTodoList, deleteTodo, deleteTodoAll, editTodo, handleClickCheckbox, handleEdit, handleSubmitEdit, resetEdit };
    
    return (
        <TodoContext.Provider value={contextValue}>{props.children}</TodoContext.Provider>
    )
}

