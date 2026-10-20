import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();

        setLoading(true);
        setError(null);

        fetch(url, { signal: controller.signal })
            .then(res => {
                if (!res.ok) throw new Error("Помилка запиту");
                return res.json();
            })
            .then(json => setData(json))
            .catch(err => {
                if (err.name !== "AbortError") setError(err);
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;