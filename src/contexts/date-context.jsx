import React, { createContext, useState } from 'react'

export const DateContext = createContext(null);

export const DateContextProvider = (props) => {

    const [ calendarDate, setCalendarDate ] = useState(new Date());
    const [ dateSelected, setDateSelected ] = useState(new Date());

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

    const scrollScreen = (id) => {
        const divId = document.getElementById(id.toDateString());
        if(divId) {
            divId.scrollIntoView({behavior: "smooth"});
        }
    }

    const contextValue = { calendarDate, setCalendarDate, dateSelected, setDateSelected, setDayBefore, setNextDay, scrollScreen };
    
    return (
        <DateContext.Provider value={contextValue}>{props.children}</DateContext.Provider>
    )
}

