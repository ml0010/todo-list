import { useContext } from 'react';
import '../styles/toggle-switch.css'
import { DarkModeContext } from '../contexts/dark-mode-context';
import { Moon, Sun } from 'phosphor-react';


const ToggleSwitch = () => {

    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

	return (
        <div className='toggle-switch'>
            <label className='label' htmlFor='toggle'>
               <div className={`toggle ${darkMode ? "dark-mode" : "light-mode"}`}>
                    <div className="icons">
                        <Sun size={24} />
                        <Moon size={24} />
                    </div>
                    <input
                        id="toggle"
                        name="toggle"
                        type="checkbox"
                        checked={darkMode}
                        onChange={toggleDarkMode}
                    />
                </div>
            </label>
        </div>
	);
};

export default ToggleSwitch;