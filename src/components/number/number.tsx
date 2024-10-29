import styles from "./number.module.css";
import { useState, useEffect } from "react";
import { ReactNode } from "react";
import gsap from "gsap";

interface Props {
    children: ReactNode;
}

const Number: React.FC<Props> = ({ children }) => {
    const [guess, setGuess] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [randomNumber] = useState<number>(Math.floor(Math.random() * 100) + 1);
    const [guessHistory, setGuessHistory] = useState<number[]>([]);

    // Выводим загаданное число в консоль для отладки
    useEffect(() => {
        console.log("Загаданное число:", randomNumber); // <--- Здесь выводим загаданное число
    }, [randomNumber]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleGuess = () => {
        const num = parseInt(inputValue);
        if (!isNaN(num)) {
            setGuess(num);
            setGuessHistory([num, ...guessHistory]); // Добавляем число в начало массива
            if (num === randomNumber) {
                setMessage("Поздравляю! Вы угадали число.");
                gsap.to("#further", {opacity: 1})
            } else if (num < randomNumber) {
                setMessage("Ваше число меньше загаданного.");
            } else {
                setMessage("Ваше число больше загаданного.");
            }
        } else {
            setMessage("Пожалуйста, введите допустимое число.");
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Поздравляю! Ты прошел на следующий этап</h1>

            <div className={styles.decorativeLine}>
                <div className={styles.foto}></div>
                <p>Теперь попробуй отгадать число, которое я загадал.</p>
            </div>
            
            <input type="number" value={inputValue} onChange={handleInputChange} className={styles.input} placeholder="Введите число"/>
            
            <button className={styles.button} onClick={handleGuess}>Угадать</button>

            {guess !== null && (<p className={`${styles.message} ${styles.highlight}`}>{message}</p>)}
            <div id="further" className={styles.further}>{children}</div>

            {guessHistory.length > 0 && (
                <div className={styles.history}>
                    <h2>История чисел:</h2>

                    <ul>
                        {guessHistory.map((guess, index) => (
                            <li key={index}>{guess}</li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
};

export default Number;
