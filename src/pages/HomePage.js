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

                    <p>Kas oled tundnud, et Kuu faasid mõjutavad sinu meeleolu, energiataset ja otsustusvõimet? Sul on õigus.</p>

                    <h2>Tänane kuu päev:</h2>
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

                                    <p className='desc-pre'><span className='description'>Tegevus:</span> {item.activity}</p>
                                    <p className='desc-pre'><span className='description'>Vägi:</span> {item.power}</p>
                                    <p className='desc-pre'><span className='description'>Tervis:</span> {item.health}</p>
                                    <p className='desc-pre'><span className='description'>Ended:</span> {item.omens}</p>
                                    <p className='desc-pre'><span className='description'>Rituaalid:</span> {item.rituals}</p>

                                    {/* Display more fields as needed */}
                                </div>
                                <p className='desc-pre'>{item.comment_2}</p>
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
                    <h2>Mis on Kuu päevade kalender?</h2>

                    <p>Kuu päevade kalender näitab ära, mitmes kuu päev täna on. Kuu päev on arvutatud välja arvestades kuu loomise ja tõusude kellaaegu ning asukohaks on määratud Tallinn. Igal Kuu päeval, mis algab Kuu tõusuga, on oma ainulaadne energia ja iseloom. Märksõnad, mis on kirjutatud kuu päevade kohta, on kirja pandud eesti oma šamaanide poolt, kes on üle 30 aasta jälginud ja üles tähendanud kuu päevi ja nende energiaid. See kalender aitab sul mõista neid energiaid ja kasutada neid enda hüvanguks.</p>

                    <div className="list-container checks">
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

                    <h2>Kuidas seda kasutada?</h2>

                    <div className="list-container">
                        <div>
                            <h3>Iga päeva kohta leiad:</h3>

                            <ul>
                                <li>Lühikese kirjelduse Kuu energiast.</li>
                                <li>Soovitused, milliseid tegevusi sel päeval soodustada ja milliseid vältida.</li>
                                <li>Kirjelduse, mille jaoks on see päev hea.</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Terve kuu kalender:</h3>

                            <p>Vaata korraga tervet kuud, et näha millised päevad on tulekul ja saad seeläbi tegevusi vastavalt planeerida.</p>
                        </div>
                        <div>
                            <h3>Tulekul uued featuurid:</h3>

                            <ul>
                                <li>Vestlusbot, kellelt otse küsida millal mingi tegevus on soositud.</li>
                                <li>Võimaluse enda märkmeid teha ja näha iga päeva kohta.</li>

                            </ul>
                        </div>
                    </div>

                    <h2>Toeta tegijat 💸 🤑💰</h2>

                    <p>Kuu päevade kalendri loomine ja üleval pidamine võtab energiat.</p>
                    <p>Kui kuu päevade kalender sulle meeldib ja sind toetab, palun toeta omakorda tegijat: </p>
                    <p>
                        <a target="_blank" href='https://wise.com/pay/r/orYcc2-Hn8v4Wdk'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="106" height="24" fill="none"><path fill="#fff" d="M58.738.359h6.498l-3.27 23.322h-6.498zm-8.193 0L46.16 13.794 44.247.359h-4.545L33.96 13.754 33.243.36h-6.299l2.193 23.322h5.222l6.459-14.75 2.272 14.75h5.143L56.725.359zm54.558 13.555H89.674c.08 3.03 1.894 5.023 4.565 5.023 2.013 0 3.608-1.077 4.844-3.13l5.208 2.368C102.501 21.702 98.729 24 94.08 24c-6.339 0-10.545-4.266-10.545-11.123C83.535 5.342 88.478 0 95.455 0c6.14 0 10.007 4.146 10.007 10.605 0 1.076-.12 2.152-.359 3.309m-5.78-4.466c0-2.71-1.516-4.425-3.947-4.425-2.512 0-4.585 1.794-5.144 4.425zM6.632 7.387 0 15.139h11.844l1.33-3.655H8.1l3.1-3.586.01-.095-2.016-3.471h9.072l-7.032 19.35h4.812L24.538.358H2.6l4.033 7.028ZM75.8 5.023c2.292 0 4.3 1.233 6.055 3.346l.921-6.575C81.143.688 78.93 0 76 0c-5.82 0-9.09 3.409-9.09 7.734 0 3 1.675 4.834 4.426 6.02l1.315.598c2.452 1.047 3.11 1.565 3.11 2.671 0 1.146-1.106 1.874-2.79 1.874-2.782.01-5.034-1.415-6.728-3.847l-.94 6.699C67.234 23.22 69.708 24 72.97 24c5.532 0 8.93-3.19 8.93-7.615 0-3.01-1.335-4.943-4.704-6.458l-1.435-.678c-1.993-.887-2.671-1.375-2.671-2.352 0-1.056.927-1.874 2.71-1.874"></path></svg>
                        </a>
                    </p>
                    <div className='spacer'></div>
                </div>
            </section>

        </div>
    );
};

export default HomePage;