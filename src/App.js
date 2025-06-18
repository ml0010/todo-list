import './App.css';
import { DateContextProvider } from './contexts/date-context';
import { TodoContextProvider } from './contexts/todo-context';
import Calendar from './pages/calendar';
import Clock from './pages/clock';
import Todo from './pages/todo';
import Weather from './pages/weather';
import ClickOutside from './components/click-outside';

function App() {

    return (
        <div className="App">
            <DateContextProvider>
                <TodoContextProvider>
                    <ClickOutside />
                    <div className='pageLeft'>
                        <Clock />
                        <Calendar />
                        <Weather />
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
