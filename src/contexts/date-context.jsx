import React, { createContext, useState } from 'react'

export const DateContext = createContext(null);

export const DateContextProvider = (props) => {

    const [ calendarDate, setCalendarDate ] = useState(new Date());
    const [ dateSelected, setDateSelected ] = useState(new Date());

    const setDayBefore = () => {
        setDateSelected(new Date(dateSelected.setDate(dateSelected.getDate() - 1)));
        setCalendarDate(new Date(dateSelected.setDate(dateSelected.getDate() - 1)));
    };
    const setNextDay = () => {
        setDateSelected(new Date(dateSelected.setDate(dateSelected.getDate() + 1)));
        setCalendarDate(new Date(dateSelected.setDate(dateSelected.getDate() + 1)));
    };

    const contextValue = { calendarDate, setCalendarDate, dateSelected, setDateSelected, setDayBefore, setNextDay };
    
    return (
        <DateContext.Provider value={contextValue}>{props.children}</DateContext.Provider>
    )
}

