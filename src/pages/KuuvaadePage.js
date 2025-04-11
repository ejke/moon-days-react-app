// src/pages/KuuvaadePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import moment from 'moment';
import { fetchMoonMonthData } from '../services/api';
import 'react-calendar/dist/Calendar.css';
import '../App.css';

const KuuvaadePage = () => {
    const [monthData, setMonthData] = useState([]);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date());
    const navigate = useNavigate();

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
            try {
                const year = selectedDate.getFullYear();
                const month = selectedDate.getMonth() + 1; // getMonth() returns 0-based month
                const data = await fetchMoonMonthData(year, month);
                setMonthData(data);
            } catch (err) {
                setError("Failed to load moon month data.");
            }
        };
        getData(date);
    }, [date]);

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

    const handleActiveStartDateChange = ({ action, activeStartDate, view }) => {
        if (view === 'month' && (action === 'next' || action === 'prev')) {
            const year = activeStartDate.getFullYear();
            const month = activeStartDate.getMonth() + 1;
            fetchMoonMonthData(year, month)
                .then(data => setMonthData(data))
                .catch(() => setError("Failed to load moon month data."));
        }
    };

    return (
        <div className='bg bg-color'>
            <section>
                <div className="calendar-container">
                    <Calendar
                        onChange={setDate}
                        value={date}
                        tileContent={tileContent}
                        tileClassName={tileClassName}
                        onClickDay={handleDayClick}
                        defaultView='month'
                        minDetail='month'
                        maxDetail='month'
                        next2Label={null}
                        prev2Label={null}
                        onActiveStartDateChange={handleActiveStartDateChange}
                    />
                </div>
                {error && <p>{error}</p>}
            </section>
        </div>
    );
};

export default KuuvaadePage;