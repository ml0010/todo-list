import { useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
    const [ todos, setTodos ] = useState([]);
    
    const addTodoToList = (newTodo) => {
        setTodos([...todos, newTodo]);
    };
    const handleDelete = (id) => {
        let updateTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updateTodos);
    };
    const handleSubmitEdit = (newTodo) => {
        const todoIndex = todos.findIndex(todo => todo.id === newTodo.id);
        if (todoIndex !== -1) {
            const updateTodos = [...todos];
            updateTodos[todoIndex] = newTodo;
            setTodos(updateTodos);
        }
    };

    return (
        <>
            <div className="App">
                <h1>To Do List</h1>
                <TodoForm onSubmit={addTodoToList} />
            </div>
            <TodoList todos={todos} deleteTodo={handleDelete} editTodo={handleSubmitEdit}/>
        </>
    );
}

export default App;
