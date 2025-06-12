import './App.css';
import { DateContextProvider } from './contexts/date-context';
import Calendar from './pages/calendar';
import Clock from './pages/clock';
import Todo from './pages/todo';

function App() {

    return (
        <div className="App">
            <DateContextProvider>
                <div className='pageLeft'>
                    <Clock />
                    <Calendar />
                </div>
                <div className='pageRight'>
                    <Todo />
                </div>
            </DateContextProvider>
        </div>
            
    );
}

export default App;
