import { useState } from "react";

const useForm = (initialValues, validate) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues(prev => ({ ...prev, [name]: value }));

        if (validate) {
            const newErrors = validate({ ...values, [name]: value });
            setErrors(newErrors);
        }
    };

    const handleSubmit = (callback) => (e) => {
        e.preventDefault();

        if (validate) {
            const newErrors = validate(values);
            setErrors(newErrors);

            if (Object.keys(newErrors).length > 0) return;
        }

        callback(values);
    };

    return { values, errors, handleChange, handleSubmit };
};

export default useForm;