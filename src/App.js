import './App.css';
import { DateContextProvider } from './contexts/date-context';
import { TodoContextProvider } from './contexts/todo-context';
import { DarkModeProvider } from './contexts/dark-mode-context'
import { Container } from './pages/container';
import { WeatherContextProvider } from './contexts/weather-context';


function App() {
    return (
        <div className='App'>
            <DateContextProvider>
                <TodoContextProvider>
                    <WeatherContextProvider>
                        <DarkModeProvider>
                            <Container />
                        </DarkModeProvider>
                    </WeatherContextProvider>
                </TodoContextProvider>
            </DateContextProvider>
        </div>
            
    );
}

export default App;
