import React, { useContext, useState } from 'react'
import '../styles/calendar.css'
import { DateContext } from '../contexts/date-context';
import { CaretDoubleLeft, CaretDoubleRight } from 'phosphor-react';


export const Calendar = () => {

    const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const [ currentDate, setCurrentDate ] = useState(new Date());
    const { dateSelected, setDateSelected } = useContext(DateContext);

    const getDatesRange = (lastDayOfMonth) => {
        const { datesArray } = Array.from({ length: lastDayOfMonth })
            .reduce(({ datesArray, current }) => ({
                    datesArray: [...datesArray, current],
                    current: current + 1
            }), { datesArray: [], current: 1 }
        );
        return datesArray;
    };

    const getSortedDays = () => {
        const numberOfDates = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const datesArray = getDatesRange(numberOfDates);
        const index = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        return [...Array(index === 0 ? 6 : index - 1), ...datesArray];
    };

    const getMonth = () => {
        const monthString = (currentDate.toDateString().split(' '))[1];
        return monthString;
    };
    const getYear = () => {
        const yearString = currentDate.getFullYear();
        return yearString;
    };

    const nextMonth = () => {
        const month = currentDate.getMonth();
        if (month < 11) {
            currentDate.setMonth(month + 1);
        } else {
            currentDate.setMonth(0);
            currentDate.setFullYear(currentDate.getFullYear() + 1);
        }
        setCurrentDate(new Date(currentDate));
    };

    const prevMonth = () => {
        const month = currentDate.getMonth();
        if (month > 0) {
            currentDate.setMonth(month - 1);
        } else {
            currentDate.setMonth(11);
            currentDate.setFullYear(currentDate.getFullYear() - 1);
        }
        setCurrentDate(new Date(currentDate));
    };
    const dateToString = (date) => {
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        return `${year}-${month}-${date}`;
    };
    return (
        <div className='calendar'>
            <div className='month-year'>
                <CaretDoubleLeft size={23} onClick={() => prevMonth()} />
                <p>{getMonth()} {getYear()}</p>
                <CaretDoubleRight size={23} onClick={() => nextMonth()} />
            </div>
            <ul className='days'>
                {DAYS.map((day, index) => 
                    <li className='day' key={index}>{day}</li>)}
            </ul>
            <ol className='dates'>
                {getSortedDays().map((date, index) => (
                    <li className={`date ${dateSelected.toDateString() === new Date(dateToString(date)).toDateString() ? 'selected' : ''}`} key={index} value={date} onClick={(e)=>setDateSelected(new Date(dateToString(e.target.value)))}>
                        {date}
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default Calendar;
