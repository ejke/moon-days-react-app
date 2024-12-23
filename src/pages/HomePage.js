// src/HomePage.js
import React, { useState, useEffect } from 'react';
import { fetchMoonDayData } from '../services/api';
import { formatDate, formatTime } from '../services/format';
import '../App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const HomePage = () => {
    const [moonData, setMoonData] = useState([]);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const getData = async (selectedDate) => {
            try {
                const data = await fetchMoonDayData(selectedDate.toISOString().split('T')[0]);
                setMoonData(data);
                if (Array.isArray(data) && data.length > 0) {
                    document.documentElement.style.setProperty('--hex-color-1', data[0].hex);
                    if (data.length > 1) {
                        document.documentElement.style.setProperty('--hex-color-2', data[1].hex);
                    } else {
                        document.documentElement.style.setProperty('--hex-color-2', data[0].hex);
                    }
                }
            } catch (err) {
                setError("Failed to load moon day data.");
            }
        };
        getData(date);
    }, [date]);

    //which hex to use? lahenda
    // useEffect(() => {
    //     if (moonData) {
    //         document.documentElement.style.setProperty('--hex-color', moonData.hex);
    //     }
    // }, [moonData]);

    return (
        <div className='bg'>
            <section>
                <div className="datepicker">
                    <DatePicker dateFormat="dd/MM/yyyy" selected={date} onChange={(date) => setDate(date)} />
                </div>
            
                    {error && <p>{error}</p>}
                    {moonData.length > 0 ? (
                        moonData.map((item, index) => (
                            <div className="box">
                                <div>
                                    <p className='smol'>{formatDate(item.date)}  🚀🌙 Kuutõus: {formatTime(item.moonrise_time)}</p>
                                    <h1 className='headline'>{item.moon_date}. {item.symbol} {item.emoji}</h1>
                                    <p className='after-headline'>
                                        <span className='description'>Värv: </span>
                                        <span className={`color-${index}`} >{item.color}</span>
                                        <span className='description'> Element: </span>
                                        {item.element}
                                    </p>
                                    <p>{item.keywords}</p>
                                    <p>{item.comment}</p>
                                    <div className='characteristics'>

                                        <p><span className='description'>Tegevus:</span> {item.activity}</p>
                                        <p><span className='description'>Vägi:</span> {item.power}</p>
                                        <p><span className='description'>Tervis:</span> {item.health}</p>
                                        <p><span className='description'>Ended:</span> {item.omens}</p>
                                        <p><span className='description'>Rituaalid:</span> {item.rituals}</p>

                                        {/* Display more fields as needed */}
                                    </div>
                                    <p>{item.comment_2}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="box">
                            <p>Laeb...</p>
                        </div>
                    )}
            </section>
        </div>
    );
};

export default HomePage;