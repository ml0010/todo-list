import React, { useContext } from 'react'
import '../styles/calendar.css'
import { DateContext } from '../contexts/date-context';
import { CalendarCheck, CaretDoubleLeft, CaretDoubleRight } from 'phosphor-react';
import { TodoContext } from '../contexts/todo-context';


export const Calendar = () => {

    const DAYS = ['MON', 'THU', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const { today, dayBefore, calendarDate, setCalendarDate, dateSelected, setDateSelected } = useContext(DateContext);
    const { todosDatesList } = useContext(TodoContext);

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
        const numberOfDates = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate();
        const datesArray = getDatesRange(numberOfDates);
        const index = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay();
        return [...Array(index === 0 ? 6 : index - 1), ...datesArray];
    };

    const getMonth = () => {
        const monthString = (calendarDate.toDateString().split(' '))[1];
        return monthString;
    };
    const getYear = () => {
        const yearString = calendarDate.getFullYear();
        return yearString;
    };

    const nextMonth = () => {
        const month = calendarDate.getMonth();
        if (month < 11) {
            calendarDate.setMonth(month + 1);
        } else {
            calendarDate.setMonth(0);
            calendarDate.setFullYear(calendarDate.getFullYear() + 1);
        }
        setCalendarDate(new Date(calendarDate));
    };

    const prevMonth = () => {
        const month = calendarDate.getMonth();
        if (month > 0) {
            calendarDate.setMonth(month - 1);
        } else {
            calendarDate.setMonth(11);
            calendarDate.setFullYear(calendarDate.getFullYear() - 1);
        }
        setCalendarDate(new Date(calendarDate));
    };
    const dateToString = (date) => {
        const month = calendarDate.getMonth() + 1;
        const year = calendarDate.getFullYear();
        return `${year}-${month}-${date}`;
    };

    const handleDateClick = (date) => {
        const dateString = new Date(dateToString(date));
        setDateSelected(dateString);
    };
    const handleSelectToday = () => {
        setDateSelected(today);
        setCalendarDate(today);
    };

    return (
        <div className='calendar'>            
            <div>
                <button className='todayBttn' onClick={()=>handleSelectToday()}><CalendarCheck size={20} />SELECT TODAY</button>
            </div>
            <div className='month-year'>
                <CaretDoubleLeft size={20} onClick={() => prevMonth()} />
                <p>{getMonth()} {getYear()}</p>
                <CaretDoubleRight size={20} onClick={() => nextMonth()} />
            </div>
            <ul className='days'>
                {DAYS.map((day, index) => 
                <li className='day' key={index}>{day}</li>
                )}
            </ul>
            <ol className='dates'>
                {getSortedDays().map((date, index) => (
                    <li 
                        className={`date 
                                ${dateSelected.toDateString() === new Date(dateToString(date)).toDateString() ? 'selected' : ''} 
                                ${today.toDateString() === new Date(dateToString(date)).toDateString() ? 'today' : ''} 
                                ${todosDatesList.includes(new Date(dateToString(date)).toDateString()) ? 'list-yes' : ''} 
                                ${dayBefore > new Date(dateToString(date)) ? 'past' : ''}
                                `} 
                        key={index} 
                        value={date} 
                        onClick={(e)=>handleDateClick(e.target.value)}>
                        {date}
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default Calendar;
