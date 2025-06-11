import './App.css';
import Todo from './pages/todo';

function App() {


    return (
        <div className="App">
            <div>
                <h1>Calendar</h1>

            </div>
            <div className='todoList'>
                <Todo></Todo>
            </div>
        </div>
            
    );
}

export default App;
