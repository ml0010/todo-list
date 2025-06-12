import './App.css';
import Clock from './components/clock';
import Todo from './pages/todo';

function App() {


    return (
        <div className="App">
            <div>
                <Clock />
            </div>
            <div>
                <h1>Calendar</h1>
            </div>
            <div className='todoList'>
                <Todo />
            </div>
        </div>
            
    );
}

export default App;
