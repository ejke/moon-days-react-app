// src/pages/KuuvaadePage.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import { fetchMoonMonthData } from '../services/api';
import 'react-calendar/dist/Calendar.css';
import '../App.css';

const KuuvaadePage = () => {
    const [monthData, setMonthData] = useState([]);
    const [error, setError] = useState(null);
    const [activeStartDate, setActiveStartDate] = useState(new Date());
    const navigate = useNavigate();
    const abortControllerRef = useRef(null);
    const currentRequestIdRef = useRef(0);

    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.id = 'dynamic-calendar-styles';

        let cssRules = '';
        monthData.forEach(dayData => {
            if (dayData.hex) {
                const className = `day-${dayData.hex.replace('#', '')}`;
                cssRules += `.${className} { background-color: ${dayData.hex}; }\n`;
            }
        });

        styleElement.textContent = cssRules;
        document.head.appendChild(styleElement);

        return () => {
            if (styleElement) {
                styleElement.remove();
            }
        };
    }, [monthData]);

    useEffect(() => {
        const getData = async (selectedDate) => {
            // Cancel any in-flight request
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            // Create new abort controller for this request
            abortControllerRef.current = new AbortController();

            // Increment request ID to track the latest request
            const requestId = ++currentRequestIdRef.current;

            setError(null);

            try {
                const year = selectedDate.getFullYear();
                const month = selectedDate.getMonth() + 1;
                const data = await fetchMoonMonthData(year, month);

                // Only update state if this is still the latest request
                if (requestId === currentRequestIdRef.current) {
                    setMonthData(data);
                }
            } catch (err) {
                // Only update error if this is still the latest request and not aborted
                if (requestId === currentRequestIdRef.current && err.name !== 'AbortError') {
                    setError("Failed to load moon month data.");
                }
            }
        };

        getData(activeStartDate);

        // Cleanup function to abort on unmount
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [activeStartDate]);

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dayData = monthData.find(item => new Date(item.date).toDateString() === date.toDateString());
            return dayData ? (
                <div className="tile-content">
                    <p>
                        <span>{dayData.moon_date}. {dayData.symbol} {dayData.emoji}</span><br/>
                        <span>Kuutõus: {dayData.moonrise_time}</span>
                    </p>
                </div>
            ) : null;
        }
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dayData = monthData.find(item => new Date(item.date).toDateString() === date.toDateString());
            if (dayData && dayData.hex) {
                return `day-${dayData.hex.replace('#', '')}`;
            }
        }
        return null;
    };
    
    const handleDayClick = (value) => {
        const formattedDate = moment(value).format('YYYY-MM-DD');
        navigate(`/paev?date=${formattedDate}`);
    };

    const handleActiveStartDateChange = ({ action, activeStartDate: newActiveStartDate, view }) => {
        if (view === 'month' && (action === 'next' || action === 'prev')) {
            // Update the activeStartDate state, which will trigger the useEffect to fetch data
            setActiveStartDate(newActiveStartDate);
        }
    };

    return (
        <div className='bg bg-color'>
            <section>
                <div className="calendar-container">
                    <Calendar
                        tileContent={tileContent}
                        tileClassName={tileClassName}
                        onClickDay={handleDayClick}
                        defaultView='month'
                        minDetail='month'
                        maxDetail='month'
                        next2Label={null}
                        prev2Label={null}
                        onActiveStartDateChange={handleActiveStartDateChange}
                        activeStartDate={activeStartDate}
                    />
                </div>
                {error && <p>{error}</p>}
            </section>
        </div>
    );
};

export default KuuvaadePage;