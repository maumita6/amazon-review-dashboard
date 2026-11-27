import React, { useEffect, useState, useMemo, useContext } from "react";
import "./ReviewFeed.css";
import { FilterContext } from './../../context/FilterContext';
import filterReviews from "../../utils/filterReviews";

export default function ReviewFeed({ rows = [] }) {
    const [viewMode, setViewMode] = useState("grid");
    const { activeFilter, setActiveFilter } = useContext(FilterContext);

    const filteredRows = useMemo(
        () => filterReviews(rows, activeFilter),
        [rows, activeFilter]
    );

    if (!rows.length)
        return null;

    console.log('Filtered Rows');
    console.log(filteredRows);

    const filteredCriticalRows = rows.filter(item => Number(item.star_rating) < 3);
    const filteredVerified = rows.filter(item => String(item.verified_purchase).toLowerCase() === 'true');


    return (
        <section className="feed-section">
            <div className="filter-toolbar">
                <div className="filter-pills-group" role="group" aria-label="Review filters">
                    <button type="button" className="filter-pill active" onClick={() => setActiveFilter("all")}>
                        All <span className="pill-count">{filteredRows.length}</span>
                    </button>

                    <button type="button" className="filter-pill" onClick={() => setActiveFilter("critical")}>
                        Critical (1–2 ★) <span className="pill-count">{filteredCriticalRows.length}</span>
                    </button>

                    <button type="button" className="filter-pill" onClick={() => setActiveFilter("verified")}>
                        Verified Purchase <span className="pill-count">{filteredVerified.length}</span>
                    </button>
                </div>
                <div className="view-toggle">
                    <button type="button" className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                        onClick={() => setViewMode("grid")}>
                        ⊞ Grid
                    </button>
                    <button type="button" className={`toggle-btn ${viewMode === "table" ? "active" : ""}`} onClick={() => setViewMode("table")}>
                        ☰ Table
                    </button>
                </div>
            </div>


            {viewMode === "grid" ? (
                <div className="reviews-grid">
                    {filteredRows.map((item) => (
                        <article key={item.review_id} className="single-review-card">
                            <div className="card-top-meta">
                                <span className="star-badge">{"★".repeat(Number(item.star_rating))}</span>
                                {String(item.verified_purchase).toLowerCase() === "true" && (
                                    <span className="verified-tag">✓ Verified</span>
                                )}
                            </div>

                            <h3 className="review-headline">{item.title}</h3>
                            <p className="review-body">{item.review_text}</p>

                            <div className="card-footer-meta">
                                <span>
                                    • {item.country}
                                </span>
                                <span className="variant-chip">{item.variant_format}</span>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="table-wrapper">
                    <table className="reviews-table">
                        <thead>
                            <tr>
                                <th>Rating</th>
                                <th>Title & Review</th>
                                <th>Variant</th>
                                <th>Date</th>
                                <th>Verified</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRows.map((item) => (
                                <tr key={item.review_id}>
                                    <td className="star-cell">{item.star_rating} ★</td>
                                    <td>
                                        <div className="table-title">{item.title}</div>
                                        <div className="table-text">{item.review_text}</div>
                                    </td>
                                    <td>
                                        <span className="variant-chip">{item.variant_format}</span>
                                    </td>
                                    <td className="date-cell">{item.review_date}</td>
                                    <td>
                                        {String(item.verified_purchase).toLowerCase() === "true" ? "✓ Yes" : "No"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}
