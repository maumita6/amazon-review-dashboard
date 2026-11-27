import React, { useMemo } from 'react';
import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import Papa from 'papaparse';
import './ComboCharts.css';

export default function ComboCharts({ rows }) {
    /*const rows = useMemo(() => {
        if (!review) return [];
        const parsed = Papa.parse(review.trim(), {
            header: true,
            skipEmptyLines: true,
        });
        return parsed.data;
    }, [review]);*/

    const chartData = useMemo(() => {
        if (!rows.length)
            return [];

        const groupedByMonth = rows.reduce((acc, row) => {
            if (!row.review_date)
                return acc;

            const monthKey = row.review_date.slice(0, 7);
            const rating = Number(row.star_rating);

            if (!acc[monthKey]) {
                acc[monthKey] = { monthKey, totalReviews: 0, ratingSum: 0, validRatings: 0 };
            }

            acc[monthKey].totalReviews += 1;

            if (!Number.isNaN(rating) && rating > 0) {
                acc[monthKey].ratingSum += rating;
                acc[monthKey].validRatings += 1;
            }
            return acc;

        }, {});

        return Object.values(groupedByMonth)
            .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
            .map((item) => {
                const [year, month] = item.monthKey.split('-');
                const dateObj = new Date(Number(year), Number(month) - 1);
                const label = dateObj.toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                });

                return {
                    period: label,
                    reviewCount: item.totalReviews,
                    avgRating: item.validRatings
                        ? Number((item.ratingSum / item.validRatings).toFixed(2))
                        : 0,
                };
            });
    }, [rows]);

    if (!chartData.length)
        return null;

    return (
        <section className="chart-card">
            <div className="chart-header">
                <div>
                    <h2 className="chart-title">Rating & Volume Over Time</h2>
                    <p className="chart-subtitle">
                        Monthly review volume compared against average star rating
                    </p>
                </div>
            </div>

            <div className="chart-body">
                <ResponsiveContainer width="75%" height={340}>
                    <ComposedChart
                        data={chartData}
                        margin={{ top: 16, right: 20, bottom: 8, left: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />

                        <XAxis
                            dataKey="period"
                            tick={{ fill: '#71717a', fontSize: 12 }}
                            axisLine={{ stroke: '#e4e4e7' }}
                            tickLine={false}
                        />

                        {/* Left Y-Axis: Review Volume (Bars) */}
                        <YAxis
                            yAxisId="left"
                            allowDecimals={false}
                            tick={{ fill: '#71717a', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            label={{
                                value: 'Reviews',
                                angle: -90,
                                position: 'insideLeft',
                                style: { fill: '#a1a1aa', fontSize: 12 },
                            }}
                        />

                        {/* Right Y-Axis: Average Star Rating 1–5 (Line) */}
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            domain={[0, 5]}
                            ticks={[1, 2, 3, 4, 5]}
                            tick={{ fill: '#d97706', fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            label={{
                                value: 'Avg Rating (★)',
                                angle: 90,
                                position: 'insideRight',
                                style: { fill: '#d97706', fontSize: 12 },
                            }}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                borderRadius: '10px',
                                border: '1px solid #e4e4e7',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
                                fontSize: '13px',
                            }}
                        />

                        <Legend
                            verticalAlign="top"
                            height={36}
                            iconType="circle"
                            wrapperStyle={{ fontSize: '13px', color: '#52525b' }}
                        />

                        {/* Bars for Monthly Review Count */}
                        <Bar
                            yAxisId="left"
                            dataKey="reviewCount"
                            name="Review Count"
                            fill="#126356"
                            stroke="#0a493e"
                            strokeWidth={1}
                            radius={[6, 6, 0, 0]}
                            barSize={60}
                        />

                        {/* Line for Average Star Rating */}
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="avgRating"
                            name="Avg. Star Rating"
                            stroke="#f59e0b"
                            strokeWidth={3}
                            dot={{ r: 5, fill: '#f59e0b', strokeWidth: 2, stroke: '#ffffff' }}
                            activeDot={{ r: 7 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
}
