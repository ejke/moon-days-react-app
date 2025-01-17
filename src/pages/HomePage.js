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
            <section>
                <div className="landing">
                    <h1>Kuu vägi - sinu teejuht isiklikuks kasvuks ja harmooniaks</h1>

                    <p>Kas oled kunagi tundnud, et Kuu faasid mõjutavad sinu meeleolu, energiataset ja otsustusvõimet? Sa ei ole üksi! Juba sajandeid on inimesed jälginud Kuu rütme ja kasutanud neid oma elus orienteerumiseks.</p>

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
                    <h2>Mis on Kuu päevade kalender?</h2>

                    <p>See on iidne tarkus, mille on kirja pannud šamaanid, kes on sügavalt ühenduses loodusega. Igal Kuu päeval, mis algab Kuu tõusuga, on oma ainulaadne energia ja iseloom. See kalender aitab sul mõista neid energiaid ja kasutada neid enda hüvanguks.</p>

                    <h2>Kellele on see mõeldud?</h2>

                    <p>Kuu päevade kalender on igaühele, kes soovib:</p>

                    <ul>
                        <li>Elada kooskõlas looduse rütmidega.</li>
                        <li>Saavutada suuremat tasakaalu ja harmooniat.</li>
                        <li>Teha teadlikumaid otsuseid.</li>
                        <li>Avastada oma sisemist potentsiaali.</li>
                        <li>Parandada oma suhteid ja enesetunnet.</li>
                    </ul>

                    <h2>Milleks seda kasutada?</h2>

                    <p>Kuu päevade kalender aitab sul:</p>

                    <ul>
                        <li>Planeerida oma tegevusi vastavalt Kuu energiale.</li>
                        <li>Mõista oma emotsioone ja käitumismustreid.</li>
                        <li>Leida sobivaid päevi erinevateks ettevõtmisteks.</li>
                        <li>Tugevdada oma intuitsiooni ja loovust.</li>
                        <li>Arendada sügavamat ühendust iseenda ja universumiga.</li>
                    </ul>

                    <h2>Kuidas seda kasutada?</h2>

                    <p>Meie veebirakenduses leiad iga päeva kohta:</p>

                    <ul>
                        <li>Lühikese kirjelduse Kuu energiast.</li>
                        <li>Soovitused, milliseid tegevusi sel päeval soodustada ja milliseid vältida.</li>
                        <li>Kirjelduse, mille jaoks on see päev hea.</li>
                    </ul>

                    <h2>Tasuta vs Tasuline versioon</h2>

                    <p>Tasuta versioon annab sulle ülevaate iga päeva põhienergiast. Tasuline versioon pakub aga sügavamat informatsiooni, sealhulgas:</p>

                    <ul>
                        <li>Täpsemaid soovitusi erinevate eluvaldkondade jaoks (armastus, karjäär, tervis).</li>
                        <li>Isikupärastatud Kuu kalendrit sinu sünnikuupäeva alusel.</li>
                        <li>Meditatsioone ja rituaale iga Kuu päeva toetamiseks.</li>
                        <li>Juurdepääsu eksklusiivsele kogukonnale, kus saad jagada oma kogemusi ja õppida teistelt.</li>
                    </ul>

                    <p>Avasta Kuu tarkus ja loo endale elu, mis on täis harmooniat ja küllust!</p>

                    <a href="#" class="button">Proovi tasuta!</a>
                    <a href="#" class="button">Telli tasuline versioon!</a>
                </div>
            </section>

        </div>
    );
};

export default HomePage;