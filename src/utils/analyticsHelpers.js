export function normalizeReviews(rawRows = []) {
    return rawRows.map((row) => ({
        ...row,
        star_rating: Number(row.star_rating) || 0,
        helpful_votes: Number(row.helpful_votes) || 0,
        image_count: Number(row.image_count) || 0,
        verified_purchase: String(row.verified_purchase).toLowerCase() === 'true',
        vine_review: String(row.vine_review).toLowerCase() === 'true',
        has_video: String(row.has_video).toLowerCase() === 'true',
    }));
}

export function calculateKPI(rows = []) {
    const totalReviews = rows.length;

    if (!totalReviews) {
        return {
            productName: 'Product Review Analysis',
            totalReviews: 0,
            avgRating: '0.0',
            positiveCount: 0,
            positivePct: 0,
            verifiedCount: 0,
            verifiedPct: 0,
            criticalCount: 0,
            topVariantName: 'N/A',
            topVariantCount: 0,
            topVariantShare: 0,
        }
    }

    const productName = rows?.product_name || 'Product Review Analysis';
    const validRatings = rows.filter((r) => r.star_rating > 0);
    const avgRating = validRatings.length
        ? (validRatings.reduce((sum, r) => sum + r.star_rating, 0) / validRatings.length).toFixed(1)
        : '0.0';

    const positiveCount = rows.filter((r) => r.star_rating >= 4).length;
    const criticalCount = rows.filter((r) => r.star_rating <= 2).length;
    const verifiedCount = rows.filter((r) => r.verified_purchase).length;
    const verifiedPct = Math.round((verifiedCount / totalReviews) * 100);

    const variantCounts = rows.reduce((acc, r) => {
        const key = r.variant_format?.trim();
        if (key) acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});

    const sortedVariants = Object.entries(variantCounts).sort((a, b) => b[1] - a[1]);
    const topVariantName = sortedVariants?.[0]?.[0] || 'N/A';
    const topVariantCount = sortedVariants?.[0]?.[1] || 0;
    const topVariantShare = totalReviews ? Math.round((topVariantCount / totalReviews) * 100) : 0;

    return {
        productName,
        totalReviews,
        avgRating,
        positiveCount,
        positivePct: Math.round((positiveCount / totalReviews) * 100),
        verifiedCount,
        verifiedPct: Math.round((verifiedCount / totalReviews) * 100),
        criticalCount,
        topVariantName,
        topVariantCount,
        topVariantShare: Math.round((topVariantCount / totalReviews) * 100),
    }
}

