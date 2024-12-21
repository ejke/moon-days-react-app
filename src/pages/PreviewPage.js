// src/PreviewPage.js
import React, { useState, useEffect } from 'react';
import { fetchMoonDayPreviewData } from '../services/api';
import { formatDate, formatTime } from '../services/format';
import '../App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PreviewPage = () => {
    const [moonData, setMoonData] = useState([]);
    const [error, setError] = useState(null);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const getData = async (selectedDate) => {
            try {
                const data = await fetchMoonDayPreviewData(selectedDate.toISOString().split('T')[0]);
                setMoonData(data);
            } catch (err) {
                setError("Failed to load moon day data.");
            }
        };
        getData(date);
    }, [date]);

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
                                <h1 className='headline'>{item.moon_date}</h1>

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

export default PreviewPage;