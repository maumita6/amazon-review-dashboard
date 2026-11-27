import React, { useMemo, useState, useEffect } from 'react';
import Papa from 'papaparse';


const modules = import.meta.glob('../../public/data/*.csv', {
    query: "?raw",
    import: "default"
});


export default function useReviewData(filename) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [csvContent, setCsvContent] = useState("");

    useEffect(() => {
        if (!filename) {
            return;
        }
        //// setLoading(true);
        //setError("");

        const matchedKey = Object.keys(modules).find((path) =>
            path.endsWith(`/${filename}.csv`)
        );
        if (!matchedKey) {
            return;
        }

        modules[matchedKey]()
            .then((text) => {
                setCsvContent(text);
                setLoading(false);
            })
            .catch(() => {
                setError("Failed to load CSV file.");
                setLoading(false);
            });

    }, [filename])

    // Parse CSV

    const rows = useMemo(() => {
        if (!csvContent) {
            return {
                rows: [],
                productName: "Product Review Analysis123"
            };
        }
        const parsed = Papa.parse(csvContent.trim(), {
            header: true,
            skipEmptyLines: true,
            transformHeader: (header) => header.trim().replace(/^\uFEFF/, ""),
        });


        return parsed.data;

    }, [csvContent]);
    //console.log(csvContent);
    console.log(rows);

    const productName = rows[0]?.product_name || "Product Review Analysis";

    return { rows, productName, loading, error }

}