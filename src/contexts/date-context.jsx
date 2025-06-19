import React, { createContext, useState } from 'react'

export const DateContext = createContext(null);

export const DateContextProvider = (props) => {

    const [ calendarDate, setCalendarDate ] = useState(new Date());
    const [ dateSelected, setDateSelected ] = useState(new Date());

    const today = new Date();
    const dayBefore = new Date().setDate(today.getDate() -1);

    const setDayBefore = () => {
        const newDate = new Date(dateSelected.setDate(dateSelected.getDate() - 1));
        setDateSelected(newDate);
        setCalendarDate(newDate);
    };
    const setNextDay = () => {
        const newDate = new Date(dateSelected.setDate(dateSelected.getDate() + 1));
        setDateSelected(newDate);
        setCalendarDate(newDate);
    };

    const scrollScreen = (todosDatesList) => {
        let divId = document.getElementById(dateSelected.toDateString());
        if(!divId) {
            divId = document.getElementById(getNextTodoDate(todosDatesList));
        }
        divId.scrollIntoView({behavior: "smooth"});
    }

    const getNextTodoDate = (todosDatesList) => {
        const newDatesList = [...todosDatesList, dateSelected].sort((a,b) => a < b ? -1 : a > b ? 1 : 0);
        const nextTodoIndex = newDatesList.indexOf(dateSelected);
        //console.log(newDatesList);
        if(nextTodoIndex === newDatesList.length-1) {
            return newDatesList[nextTodoIndex-1].toDateString();
        }
        return newDatesList[nextTodoIndex+1].toDateString();
    }

    const contextValue = { today, dayBefore, calendarDate, setCalendarDate, dateSelected, setDateSelected, setDayBefore, setNextDay, scrollScreen };
    
    return (
        <DateContext.Provider value={contextValue}>{props.children}</DateContext.Provider>
    )
}

