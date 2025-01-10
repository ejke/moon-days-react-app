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
                <div className="tile-content" style={{ backgroundColor: dayData.hex }}>
                    <p>
                        <span>{dayData.moon_date}. {dayData.symbol} {dayData.emoji}</span><br/>
                        <span>Kuutõus: {dayData.moonrise_time}</span>
                    </p>
                </div>
            ) : null;
        }
    };
    
    const handleDayClick = (value) => {
        const formattedDate = moment(value).format('YYYY-MM-DD');
        navigate(`/?date=${formattedDate}`);
    };

    return (
        <div className='bg'>
            <section>
                <div className="calendar-container">
                    <Calendar
                        onChange={setDate}
                        value={date}
                        tileContent={tileContent}
                        onClickDay={handleDayClick}
                    />
                </div>
                {error && <p>{error}</p>}
            </section>
        </div>
    );
};

export default KuuvaadePage;