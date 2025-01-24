// src/HomePage.js
import React, { useState, useEffect } from 'react';
import { fetchMoonDayData } from '../services/api';
import { formatDate, formatTime } from '../services/format';
import '../App.css';

const HomePage = () => {
    const [moonData, setMoonData] = useState([]);
    const [error, setError] = useState(null);
    const [date] = useState(new Date());

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

    return (
        <div className='bg bg-static-color'>
            <section className='bg-gradient'>
            <div className="landing">
                    <h1>Kuu päevade kalender</h1>

                </div>
            </section>
            <section>
                <div className="landing">

                    <p className='center'>Kas oled tundnud, et Kuu faasid mõjutavad sinu meeleolu, energiataset ja otsustusvõimet?</p>

                    <h2 className='center'>Tänane kuu päev:</h2>
                </div>
            </section>
            <section>
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
            <section>
                <div className="landing">
                    <h2 className='center'>Mis on Kuu päevade kalender?</h2>

                    <p className='center'>Kuu päevade kalender näitab ära, mitmes kuu päev täna on. Kuu päev on arvutatud välja arvestades asukohaks Tallinna linna Eestis, kuu loomise ja tõusude kellaaegu.  Igal Kuu päeval, mis algab Kuu tõusuga, on oma ainulaadne energia ja iseloom. Märksõnad, mis on kirjutatud kuu päevade kohta, on kirja pandud eesti oma šamaanide poolt, kes on üle 30 aasta jälginud ja üles tähendanud kuu päevi ja nende energiaid. See kalender aitab sul mõista neid energiaid ja kasutada neid enda hüvanguks.</p>

                    <div className="list-container">
                        <div>
                            <h2>Kellele on see mõeldud?</h2>

                            <p>Kuu päevade kalender on igaühele, kes soovib:</p>

                            <ul>
                                <li>Elada kooskõlas looduse rütmidega.</li>
                                <li>Saavutada suuremat tasakaalu ja harmooniat.</li>
                                <li>Teha teadlikumaid otsuseid.</li>
                                <li>Avastada oma sisemist potentsiaali.</li>
                                <li>Parandada oma suhteid ja enesetunnet.</li>
                            </ul>
                        </div>

                        <div>
                            <h2>Milleks seda kasutada?</h2>

                            <p>Kuu päevade kalender aitab sul:</p>

                            <ul>
                                <li>Planeerida oma tegevusi vastavalt Kuu energiale.</li>
                                <li>Mõista oma emotsioone ja käitumismustreid.</li>
                                <li>Leida sobivaid päevi erinevateks ettevõtmisteks.</li>
                                <li>Tugevdada oma intuitsiooni ja loovust.</li>
                                <li>Arendada sügavamat ühendust iseenda ja universumiga.</li>
                            </ul>
                        </div>
                    </div>

                    <h2 className='center'>Kuidas seda kasutada?</h2>

                    <p >Meie veebirakenduses leiad iga päeva kohta:</p>

                    <ul>
                        <li>Lühikese kirjelduse Kuu energiast.</li>
                        <li>Soovitused, milliseid tegevusi sel päeval soodustada ja milliseid vältida.</li>
                        <li>Kirjelduse, mille jaoks on see päev hea.</li>
                    </ul>

                    <h2 className='center'>Toeta tegijat</h2>

                    <p className='center'>Kuu päevade kalendri loomine ja üleval pidamine võtab energiat.</p>
                    <p className='center'>Kui kuu päevade kalender sulle meeldib või on kasulik, toeta tegijat püsikorraldusega: </p>
                </div>
            </section>

        </div>
    );
};

export default HomePage;