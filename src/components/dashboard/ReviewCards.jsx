import React, { useMemo, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import './ReviewCard.css';
import { FilterContext } from './../../context/FilterContext';



export default function ReviewCard({ rows }) {
    const navigate = useNavigate();

    const { setActiveFilter } = useContext(FilterContext);


    /* const rows = useMemo(() => {
         if (!review) return [];
         const parsed = Papa.parse(review.trim(), {
             header: true,
             skipEmptyLines: true,
         });
         return parsed.data;
     }, [review]);*/

    if (!rows.length) {
        return (
            <div className="dashboard-wrapper">
                <div className="loading-state">Loading product analytics...</div>
            </div>
        );
    }

    const productName = rows?.[0]?.product_name || 'Product Review Analysis';
    const totalReviews = rows.length;

    const numericRatings = rows
        .map((item) => Number(item.star_rating))
        .filter((val) => !Number.isNaN(val) && val > 0);

    const avgRating = numericRatings.length
        ? (numericRatings.reduce((sum, val) => sum + val, 0) / numericRatings.length).toFixed(2)
        : '0.0';

    const positiveCount = rows.filter((item) => Number(item.star_rating) >= 4).length;
    const positivePct = Math.round((positiveCount / totalReviews) * 100);

    const verifiedCount = rows.filter((item) => String(item.verified_purchase).toLowerCase() === 'true').length;
    const verifiedPct = Math.round((verifiedCount / totalReviews) * 100);

    const variantCounts = rows.reduce((acc, item) => {
        const variant = item.variant_format?.trim();
        if (variant) {
            acc[variant] = (acc[variant] || 0) + 1;
        }
        return acc;
    }, {});

    const sortedVariants = Object.entries(variantCounts).sort((a, b) => b[1] - a[1]);
    const topVariantName = sortedVariants?.[0]?.[0] || 'N/A';
    const topVariantCount = sortedVariants?.[0]?.[1] || 0;
    const topVariantShare = totalReviews ? Math.round((topVariantCount / totalReviews) * 100) : 0;

    return (
        <section className="kpi-grid">
            <div className="kpi-card">
                <div className="kpi-top">
                    <span className="kpi-label">Average Rating</span>
                    <span className="kpi-pill pill-amber">★ Score</span>
                </div>
                <div className="kpi-bottom">
                    <span className="kpi-value">{avgRating}</span>
                    <span className="kpi-sub">/ 5.0</span>
                </div>
            </div>

            <div className="kpi-card">
                <div className="kpi-top">
                    <span className="kpi-label">Positive Sentiment</span>
                    <span className="kpi-pill pill-green">4 & 5 ★</span>
                </div>
                <div className="kpi-bottom">
                    <span className="kpi-value">{positivePct}%</span>
                    <span className="kpi-sub">({positiveCount})</span>
                </div>
            </div>

            <div className="kpi-card" onClick={() => setActiveFilter("verified")}>
                <div className="kpi-top">
                    <span className="kpi-label">Verified Buyers</span>
                    <span className="kpi-pill pill-blue">Confirmed</span>
                </div>
                <div className="kpi-bottom">
                    <span className="kpi-value">{verifiedPct}%</span>
                    <span className="kpi-sub">({verifiedCount})</span>
                </div>
            </div>

            <div className="kpi-card kpi-card-wide">
                <div className="kpi-top">
                    <span className="kpi-label">Most Demanded Variant</span>
                    <span className="kpi-pill pill-purple">
                        {topVariantCount} ({topVariantShare}%)
                    </span>
                </div>
                <div className="kpi-bottom">
                    <span className="kpi-value-single-line" title={topVariantName}>
                        {topVariantName}
                    </span>
                </div>
            </div>
        </section>
    );
}
