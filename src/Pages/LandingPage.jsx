import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';

import './../App.css';


export default function LandingPage() {

    const modules = import.meta.glob('../../public/data/*.csv');

    const filenames = Object.keys(modules).map((item) => item.split('.')[4].split('/').pop())

    console.log(filenames);

    const navigate = useNavigate();




    return (
        <div className="app-container">
            <div>
                <h1 className="hero-title">
                    Amazon reviews to<br />a spreadsheet
                </h1>
                <p className="hero-subtitle">
                    Open a product on Amazon, click Export, and download its reviews as CSV or Excel. Free exports up to 100 reviews.
                </p>
            </div>
            {filenames.map((name) => (
                <div className="ui-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <strong key={name}>{name}</strong>

                    </div>

                    <div style={{ display: 'flex', gap: '0.2rem', alignItems: 'center' }}>
                        <button className="btn-secondary" style={{ flex: 1 }} onClick={() => navigate(`/dashboard/${encodeURIComponent(name)}`)}>
                            Analyse product
                        </button>
                    </div>
                </div>
            ))}


        </div>
    );

}