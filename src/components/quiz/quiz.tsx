import React, { useState } from "react";
import styles from "./quiz.module.css";
import { ReactNode } from "react";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const questions: Question[] = [
    {
      question: "Какое количество игроков в одной баскетбольной команде на поле?",
      answers: ["4", "5", "6"],
      correctAnswer: "5",
    },
    {
      question: "Кто считается лучшим баскетболистом всех времен по версии NBA?",
      answers: ["Кобе Брайант", "Майкл Джордан", "Леброн Джеймс"],
      correctAnswer: "Майкл Джордан",
    },
    {
      question: "Сколько очков приносит успешный бросок из-за трехочковой линии?",
      answers: ["2", "3", "4"],
      correctAnswer: "3",
    },
    {
      question: "Сколько секунд команда может владеть мячом в нападении, прежде чем атаковать корзину?",
      answers: ["12 секунд", "18 секунд", "24 секунды"],
      correctAnswer: "24 секунды",
    },
    {
      question: "Как называется бросок сверху в кольцо?",
      answers: ["Трипл-дабл", "Данк", "Слэм"],
      correctAnswer: "Данк",
    },
    {
      question: "Кто является самым результативным игроком NBA за всю историю?",
      answers: ["Карим Абдул-Джаббар", "Майкл Джордан", "Леброн Джеймс"],
      correctAnswer: "Карим Абдул-Джаббар",
    },
    {
      question: "Какая команда NBA выиграла наибольшее количество чемпионатов?",
      answers: ["Лос-Анджелес Лейкерс", "Бостон Селтикс", "Чикаго Буллз"],
      correctAnswer: "Бостон Селтикс",
    },
    {
      question: "Какой игрок NBA был известен прозвищем 'Король'?",
      answers: ["Леброн Джеймс", "Шакил О'Нил", "Дуэйн Уэйд"],
      correctAnswer: "Леброн Джеймс",
    },
    {
      question: "В каком году баскетбол стал олимпийским видом спорта?",
      answers: ["1936", "1952", "1968"],
      correctAnswer: "1936",
    },
    {
      question: "Как называется командная защита, когда каждый игрок следит за своим соперником?",
      answers: ["Зонная защита", "Индивидуальная защита", "Командное перекрытие"],
      correctAnswer: "Индивидуальная защита",
    },
];

interface props{
    children: ReactNode;
}

const Quiz: React.FC<props> = ({children}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [answered, setAnswered] = useState<boolean[]>(Array(questions.length).fill(false));

  const handleAnswerOptionClick = (index: number, answer: string) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = answer;

    const updatedAnswered = [...answered];
    updatedAnswered[index] = true;

    setSelectedAnswers(updatedAnswers);
    setAnswered(updatedAnswered);
  };

  const progressPercentage = (selectedAnswers.filter(answer => answer !== "").length / questions.length) * 100;
  const allAnswered = answered.every((isAnswered) => isAnswered); // Проверка, отвечены ли все вопросы

  return (
    <>
      <div className={styles.quizContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }}></div>
        </div>

        <h2 className={styles.title}>Спаси мяч!</h2>

        <div className={styles.cardsContainer}>
          {questions.map((q, index) => (
            <div key={index} className={styles.questionCard}>
              <div className={styles.question}>{q.question}</div>
              <div className={styles.answerSection}>
                {q.answers.map((answer) => {
                  let buttonClass = styles.answerButton;

                  if (answered[index]) {
                    if (answer === q.correctAnswer) {
                      buttonClass += ` ${styles.correct}`;
                    } else if (selectedAnswers[index] === answer) {
                      buttonClass += ` ${styles.incorrect}`;
                    }
                  }

                  return (
                    <button
                      key={answer}
                      className={buttonClass}
                      onClick={() => handleAnswerOptionClick(index, answer)}
                      disabled={answered[index]}
                    >
                      {answer}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {allAnswered && (
          <div className={styles.scoreSection}>
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
