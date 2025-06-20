import React, { useEffect, useState } from 'react'
import '../styles/clock.css'

export const Clock = () => {

    const [ date, setDate ] = useState(new Date());

    const addZero = (num) => {
        if (num < 10) {
            num = '0' + num;
        } 
        return num;
    };

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const showDay = days[date.getDay()];
    const showDate =  addZero(date.getDate()) + "/" + addZero((date.getMonth() + 1)) + "/" + date.getFullYear();
    const showTime = addZero(date.getHours()) + ':'+ addZero(date.getMinutes()) + ':' + addZero(date.getSeconds());

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, [date]);
    
    return (
        <div className='clock'>
            <p>{showDay} {showDate}</p>
            <p>{showTime}</p>
        </div>
    )
}
export default Clock;
