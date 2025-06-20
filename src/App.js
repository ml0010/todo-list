import './App.css';
import { DateContextProvider } from './contexts/date-context';
import { TodoContextProvider } from './contexts/todo-context';
import { DarkModeProvider } from './contexts/dark-mode-context'
import { Container } from './pages/container';


function App() {
    return (
        <div className='App'>
            <DateContextProvider>
                <TodoContextProvider>
                    <DarkModeProvider>
                        <Container />
                    </DarkModeProvider>
                </TodoContextProvider>
            </DateContextProvider>
        </div>
            
    );
}

export default App;
