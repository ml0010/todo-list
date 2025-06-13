import React, { createContext, useState } from 'react'

export const DateContext = createContext(null);

export const DateContextProvider = (props) => {

    const [ dateSelected, setDateSelected ] = useState(new Date());

    const setDayBefore = () => {
        setDateSelected(new Date(dateSelected.setDate(dateSelected.getDate() - 1)));
    };
    const setNextDay = () => {
        setDateSelected(new Date(dateSelected.setDate(dateSelected.getDate() + 1)));
    };

    const contextValue = { dateSelected, setDateSelected, setDayBefore, setNextDay };
    
    return (
        <DateContext.Provider value={contextValue}>{props.children}</DateContext.Provider>
    )
}

