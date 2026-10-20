import { useState, useRef } from "react";
import useWindowSize from "./hooks/useWindowSize";
import useFetch from "./hooks/useFetch";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";
import useClickOutside from "./hooks/useClickOutside";
import useOnlineStatus from "./hooks/useOnlineStatus";
import useInterval from "./hooks/useInterval";
import useForm from "./hooks/useForm";

const App = () => {
    const { width, height } = useWindowSize();

    const { data, loading, error } = useFetch("https://dummyjson.com/users/1");

    const [isOn, toggle] = useToggle(false);

    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);

    const boxRef = useRef(null);
    const [boxOpen, setBoxOpen] = useState(false);
    useClickOutside(boxRef, () => setBoxOpen(false));

    const isOnline = useOnlineStatus();

    const [seconds, setSeconds] = useState(0);
    const [delay, setDelay] = useState(1000);
    useInterval(() => setSeconds(s => s + 1), delay);

    const validateForm = (values) => {
        const errors = {};
        if (!values.name || values.name.length < 3) errors.name = "Мінімум 3 символи";
        if (!values.email || !values.email.includes("@")) errors.email = "Невірний email";
        return errors;
    };

    const { values, errors, handleChange, handleSubmit } = useForm(
        { name: "", email: "" },
        validateForm
    );

    return (
        <div style={{ padding: 20, fontFamily: "Arial" }}>
            <h1>TooMuchHooks</h1>

            <section>
                <h2>1. useWindowSize</h2>
                <p>Ширина: {width}, Висота: {height}</p>
            </section>

            <section>
                <h2>2. useFetch</h2>
                {loading && <p>Завантаження...</p>}
                {error && <p style={{ color: "red" }}>{error.message}</p>}
                {data && <p>Ім'я: {data.firstName} {data.lastName}</p>}
            </section>

            <section>
                <h2>3. useToggle</h2>
                <p>{isOn ? "УВІМКНЕНО" : "ВИМКНЕНО"}</p>
                <button onClick={toggle}>Перемкнути</button>
            </section>

            <section>
                <h2>4. usePrevious</h2>
                <p>Поточне: {count}, Попереднє: {prevCount ?? "—"}</p>
                <button onClick={() => setCount(c => c + 1)}>+1</button>
            </section>

            <section>
                <h2>5. useClickOutside</h2>
                <button onClick={() => setBoxOpen(true)}>Відкрити блок</button>

                {boxOpen && (
                    <div
                        ref={boxRef}
                        style={{
                            background: "#eee",
                            padding: 20,
                            marginTop: 10,
                            border: "1px solid #ccc"
                        }}
                    >
                    </div>
                )}
            </section>

            <section>
                <h2>6. useOnlineStatus</h2>
                <p style={{ color: isOnline ? "green" : "red" }}>
                    {isOnline ? "Онлайн" : "Офлайн"}
                </p>
            </section>

            <section>
                <h2>7. useInterval</h2>
                <p>Секунд: {seconds}</p>
                <button onClick={() => setDelay(null)}>Стоп</button>
                <button onClick={() => setDelay(1000)}>Старт</button>
            </section>

            <section>
                <h2>8. useForm</h2>
                <form onSubmit={handleSubmit((v) => alert("OK: " + JSON.stringify(v)))}>
                    <div>
                        <label>Ім'я:</label>
                        <input
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                    </div>
                    <button type="submit">Відправити</button>
                </form>
            </section>
        </div>
    );
};

export default App;