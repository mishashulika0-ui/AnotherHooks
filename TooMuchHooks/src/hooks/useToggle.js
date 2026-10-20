import { useState, useCallback } from "react";

const useToggle = (initial = false) => {
    const [value, setValue] = useState(initial);

    const toggle = useCallback(() => {
        setValue(v => !v);
    }, []);

    return [value, toggle];
};

export default useToggle;