import React, { useMemo, useEffect, useState, useContext } from 'react';
import './ReviewCard.css';
import { FilterContext } from './../../context/FilterContext';


export default function ReviewCard({ rows }) {

    const { setActiveFilter } = useContext(FilterContext);

    console.log(rows);

    if (!rows) {
        return (
            <div className="dashboard-wrapper">
                <div className="loading-state">Loading product analytics...</div>
            </div>
        );
    }

    return (
        <section className="kpi-grid">
            <div className="kpi-card">
                <div className="kpi-top">
                    <span className="kpi-label">Average Rating</span>
                    <span className="kpi-pill pill-amber">★ Score</span>
                </div>
                <div className="kpi-bottom">
                    <span className="kpi-value">{rows.avgRating}</span>
                    <span className="kpi-sub">/ 5.0</span>
                </div>
            </div>

            <div className="kpi-card">
                <div className="kpi-top">
                    <span className="kpi-label">Positive Sentiment</span>
                    <span className="kpi-pill pill-green">4 & 5 ★</span>
                </div>
                <div className="kpi-bottom">
                    <span className="kpi-value">{rows.positivePct}%</span>
                    <span className="kpi-sub">({rows.positiveCount})</span>
                </div>
            </div>

            <div className="kpi-card" onClick={() => setActiveFilter("verified")}>
                <div className="kpi-top">
                    <span className="kpi-label">Verified Buyers</span>
                    <span className="kpi-pill pill-blue">Confirmed</span>
                </div>
                <div className="kpi-bottom">
                    <span className="kpi-value">{rows.verifiedPct}%</span>
                    <span className="kpi-sub">({rows.verifiedCount})</span>
                </div>
            </div>

            <div className="kpi-card kpi-card-wide">
                <div className="kpi-top">
                    <span className="kpi-label">Most Demanded Variant</span>
                    <span className="kpi-pill pill-purple">
                        {rows.topVariantCount} ({rows.topVariantShare}%)
                    </span>
                </div>
                <div className="kpi-bottom">
                    <span className="kpi-value-single-line" title={rows.topVariantName}>
                        {rows.topVariantName}
                    </span>
                </div>
            </div>
        </section>
    );
}
