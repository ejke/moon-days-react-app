import React, { useState, useEffect } from 'react';
import { fetchMoonDayData } from './services/api';

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
        <div>
            <h1>Moon Days</h1>
            {error && <p>{error}</p>}
            {moonData ? (
                <div>
                    <h2>{moonData.date}</h2>
                    <p>Color: {moonData.color}</p>
                    <p>Symbol: {moonData.symbol}</p>
                    {/* Display more fields as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};


export default App;
