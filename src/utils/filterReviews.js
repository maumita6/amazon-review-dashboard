import React, { useState } from "react";

export default function filterReviews(rows = [], activeFilter = 'all') {
    if (activeFilter === 'critical') {
        return rows.filter(item => Number(item.star_rating) < 3)
    }

    if (activeFilter === 'verified') {
        return rows.filter((item) => String(item.verified_purchase).toLowerCase() === 'true');
    }

    return rows;
}