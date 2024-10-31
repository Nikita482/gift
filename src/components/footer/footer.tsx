import styles from "./footer.module.css";

const Footer: React.FC = () => {
    const handlePlayAgain = () => {
        window.location.reload(); // Перезагрузка страницы
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.finalMessage}>
                <h2>Поздравляю, квест завершен!</h2>
                <p>Ты успешно прошел все задания и спас баскетбольный мяч! Теперь мяч спасен и готов к новым приключениям!</p>
                <button className={styles.playAgain} onClick={handlePlayAgain}>Сыграть снова</button>
            </div>
        </div>
    );
};

export default Footer;
