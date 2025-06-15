import React, { useEffect, useState } from 'react'
import '../styles/clock.css'

export const Clock = () => {

    const [ date, setDate ] = useState(new Date());

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const showDay = days[date.getDay()];
    const showDate =  date.getDate() + " / " + (date.getMonth() + 1) + " / " + date.getFullYear();
    const showTime = date.getHours() + ':'+ date.getMinutes() + ':' + date.getSeconds();

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [date]);
    
    return (
        <div className='clock'>
            <h1>{showDay} {showDate}</h1>
            <h1>{showTime}</h1>
        </div>
    )
}
export default Clock;
