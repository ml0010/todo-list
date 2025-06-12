import React, { createContext, useState } from 'react'

export const DateContext = createContext(null);

export const DateContextProvider = (props) => {

    const [ dateSelected, setDateSelected ] = useState(new Date());

    const contextValue = { dateSelected, setDateSelected };
    return (
        <DateContext.Provider value={contextValue}>{props.children}</DateContext.Provider>
    )
}

