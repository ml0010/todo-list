import React, { createContext, useState } from 'react'

export const TodoContext = createContext(null);

export const TodoContextProvider = (props) => {

    const [ todos, setTodos ] = useState([]);
    const [ todoDates, setTodoDates ] = useState([]);

    const getTodoList = async () => {
        console.log("GET TODO LIST")
        try {
            const response = await fetch(`http://localhost:4000/list`, {mode:'cors'});
            const data = await response.json();
            if(data === null) { 
                console.log("No todo list");
            } else {
                setTodos(()=>[...data]);
                //setTodoListLoaded(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    
    const contextValue = { todos, setTodos, getTodoList, todoDates, setTodoDates };
    
    return (
        <TodoContext.Provider value={contextValue}>{props.children}</TodoContext.Provider>
    )
}

