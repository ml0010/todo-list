import React, { useContext } from 'react'
import Calendar from './calendar';
import Clock from './clock';
import Todo from './todo';
import Weather from './weather';
import ClickOutside from '../components/click-outside';
import ToggleSwitch from '../components/toggle-switch';
import '../styles/container.css'
import { DarkModeContext } from '../contexts/dark-mode-context';

export const Container = () => {

    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`container dot ${darkMode? 'dark-mode' : 'light-mode'}`}>
            <ClickOutside />
            <ToggleSwitch label='nightmode' />
            <div className='pageLeft'>
                <div className='top'>

                    <Clock />
                </div>
                <Calendar />
                <Weather />
            </div>
            <div className='pageRight'>
                <Todo />
            </div>
        </div>
    )
}
