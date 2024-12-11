// src/HomePage.js
import React, { useState, useEffect } from 'react';
import { fetchMoonDayData } from '../services/api';
import { formatDate, formatTime } from '../services/format';
import '../App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HomePage = () => {
    const [moonData, setMoonData] = useState(null);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const getData = async (selectedDate) => {
            try {
                const data = await fetchMoonDayData(selectedDate.toISOString().split('T')[0]);
                setMoonData(data);
            } catch (err) {
                setError("Failed to load moon day data.");
            }
        };
        getData(date);
    }, [date]);

    useEffect(() => {
        if (moonData) {
            document.documentElement.style.setProperty('--hex-color', moonData.hex);
        }
    }, [moonData]);

    return (
        <div className='bg'>
            <section>
                <div className="datepicker">
                    <DatePicker dateFormat="dd/MM/yyyy" selected={date} onChange={(date) => setDate(date)} />
                </div>
                <div className="box">
                    {error && <p>{error}</p>}
                    {moonData ? (
                        <div>
                            <p className='smol'>{formatDate(moonData.date)}  🚀🌙 Kuutõus: {formatTime(moonData.moonrise_time)}</p>
                            <h1 className='headline'>{moonData.moon_date}. {moonData.symbol} {moonData.emoji}</h1>
                            <p className='after-headline'>
                                <span className='description'>Värv: </span>
                                <span className='color' >{moonData.color}</span>
                                <span className='description'> Element: </span>
                                {moonData.element}
                            </p>
                            <p>{moonData.keywords}</p>
                            <p>{moonData.comment}</p>
                            <div className='characteristics'>

                                <p><span className='description'>Tegevus:</span> {moonData.activity}</p>
                                <p><span className='description'>Vägi:</span> {moonData.power}</p>
                                <p><span className='description'>Tervis:</span> {moonData.health}</p>
                                <p><span className='description'>Ended:</span> {moonData.omens}</p>
                                <p><span className='description'>Rituaalid:</span> {moonData.rituals}</p>

                                {/* Display more fields as needed */}
                            </div>
                            <p>{moonData.comment_2}</p>
                        </div>
                    ) : (
                        <p>Laeb...</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;