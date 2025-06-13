import './App.css';
import { DateContextProvider } from './contexts/date-context';
import { TodoContextProvider } from './contexts/todo-context';
import Calendar from './pages/calendar';
import Clock from './pages/clock';
import Todo from './pages/todo';

function App() {

    return (
        <div className="App">
            <DateContextProvider>
                <TodoContextProvider>
                    <div className='pageLeft'>
                        <Clock />
                        <Calendar />
                    </div>
                    <div className='pageRight'>
                        <Todo />
                    </div>
                </TodoContextProvider>
            </DateContextProvider>
        </div>
            
    );
}

export default App;
