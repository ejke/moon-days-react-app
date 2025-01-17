// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PaevavaadePage from './pages/PaevavaadePage';
import KuuvaadePage from './pages/KuuvaadePage';
import PreviewPage from './pages/PreviewPage';
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <nav className="navbar">
                    <div className="navbar-logo">
                        <Link to="/"><img src="/logo.png" alt="Logo" /></Link>
                    </div>
                    <ul className="navbar-links">
                        <li>
                            <Link to="/paev">Päev</Link>
                        </li>
                        <li>
                            <Link to="/kuuvaade">Kuuvaade</Link>
                        </li> 
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/paev" element={<PaevavaadePage />} />
                    <Route path="/kuuvaade" element={<KuuvaadePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;