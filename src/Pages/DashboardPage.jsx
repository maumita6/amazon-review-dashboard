import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, Outlet, useParams } from 'react-router-dom';
import Papa from "papaparse";
import ReviewCard from '../components/dashboard/ReviewCards';
import ComboCharts from '../components/dashboard/ComboChart';
import ReviewFeed from '../components/dashboard/ReviewFeed';
import useReviewData from '../hooks/useReviewData';
import { FilterContext } from "./../context/FilterContext";


//Load all csv files
/*const modules = import.meta.glob('../../public/data/*.csv', {
    query: "?raw",
    import: "default"
});*/


export default function DashboardPage() {

    const { filename } = useParams();
    const navigate = useNavigate();

    const [activeFilter, setActiveFilter] = useState('all');



    /* const [csvContent, setCsvContent] = useState("");
 
     console.log(`${decodeURIComponent(filename)}`);
 
 
     useEffect(() => {
         const matchedKey = Object.keys(modules).find((path) =>
             path.endsWith(`/${filename}.csv`)
         );
 
         if (matchedKey) {
             modules[matchedKey]().then((text) => {
                 setCsvContent(text);
                 // console.log(JSON.parse(csvContent));
             })
         } else {
             console.error(`No CSV found matching: ${filename}.csv`);
         }
 
     }, [filename, csvContent])*/

    const { rows, productName, loading, error } = useReviewData(filename);

    if (loading) return <div className="loading-state">Loading dashboard...</div>;
    if (error) return <div className="error-state">{error}</div>;




    return (
        <>
            <FilterContext.Provider value={{ activeFilter, setActiveFilter }}>
                <div className="min-h-screen bg-gradient-to-br from-[#eef7f4] via-[#f6f9f8] to-[#fbf3eb] px-24 py-16 text-zinc-900 md:px-12">
                    <div className="dashboard-wrapper">
                        <div className="dashboard-container">
                            <header className="dashboard-header">
                                <div className="title-row">
                                    <h1 className="product-title">{productName}</h1>
                                    <span className="total-reviews-badge">{rows.length} Reviews</span>
                                </div>
                                <button className="back-btn" onClick={() => navigate("/")}>
                                    ← Back to Datasets
                                </button>
                            </header>

                            <ReviewCard rows={rows}></ReviewCard>
                            <ComboCharts rows={rows}></ComboCharts>
                            <ReviewFeed rows={rows}></ReviewFeed>
                        </div>
                    </div>
                </div>
            </FilterContext.Provider>
        </>
    );


}