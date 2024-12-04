import React, { useState, useEffect } from 'react';
import { fetchMoonDayData } from './services/api';
import './App.css';

const App = () => {
    const [moonData, setMoonData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchMoonDayData(new Date().toISOString());
                setMoonData(data);
            } catch (err) {
                setError("Failed to load moon day data.");
            }
        };
        getData();
    }, []);

    return (
        <div className='bg'>
            <section className="box">
                {error && <p>{error}</p>}
                {moonData ? (
                    <div>
                        {/* change date format -> K, 04.detsember 2024 */}
                        {/* get color and set as style  */}
                        <p className='smol'>{moonData.date}  🚀🌙 {moonData.moonrise_time}</p>
                        <h1 className='headline'>{moonData.moon_date}. {moonData.symbol} 🦄</h1>
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
                    <p>Loading...</p>
                )}
            </section>
        </div>
    );
};


export default App;
