// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import KuuvaadePage from './pages/KuuvaadePage';
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <nav className="navbar">
                    <div className="navbar-logo">
                        <img src="/logo.png" alt="Logo" />
                    </div>
                    {/* <ul className="navbar-links">
                        <li>
                            <Link to="/">Päev</Link>
                        </li>
                        <li>
                            <Link to="/kuuvaade">Kuuvaade</Link>
                        </li>
                    </ul> */}
                </nav>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/kuuvaade" element={<KuuvaadePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;