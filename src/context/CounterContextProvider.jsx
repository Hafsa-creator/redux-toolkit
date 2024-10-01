import React, { useState } from 'react'
import CounterContext from './CounterContext'

const CounterContextProvider = ({ children }) => {

    const [totalItems, setTotalItems] = useState(0);

    const cartItems = (count) => {
        setTotalItems(count);
    }

    return (
        <CounterContext.Provider value={{ totalItems, cartItems }}>
            {children}
        </CounterContext.Provider>
    )
}

export default CounterContextProvider