import React, { useState } from "react";
import styles from "./quiz.module.css";

interface Question {
  question: string;
  answers: string[];
  correctAnswer: string;
}

const questions: Question[] = [
    {
      question: "Что является столицей Франции?",
      answers: ["Берлин", "Мадрид", "Париж"],
      correctAnswer: "Париж",
    },
    {
      question: "Какой элемент имеет химический символ O?",
      answers: ["Золото", "Кислород", "Водород"],
      correctAnswer: "Кислород",
    },
    {
      question: "Кто написал 'Гарри Поттера'?",
      answers: ["Джоан Роулинг", "Стивен Кинг", "Джордж Р. Р. Мартин"],
      correctAnswer: "Джоан Роулинг",
    },
    {
      question: "Какой планеты нет в нашей солнечной системе?",
      answers: ["Плутон", "Нептун", "Ксенон"],
      correctAnswer: "Ксенон",
    },
    {
      question: "Какой самый большой океан на Земле?",
      answers: ["Атлантический", "Индийский", "Тихий"],
      correctAnswer: "Тихий",
    },
    {
      question: "Сколько дней в высокосном году?",
      answers: ["365", "366", "360"],
      correctAnswer: "366",
    },
    {
      question: "Какой язык программирования используется для создания веб-страниц?",
      answers: ["Python", "HTML", "Java"],
      correctAnswer: "HTML",
    },
    {
      question: "Какой год был началом Второй мировой войны?",
      answers: ["1939", "1945", "1941"],
      correctAnswer: "1939",
    },
    {
      question: "Какой цвет получается при смешивании красного и желтого?",
      answers: ["Оранжевый", "Зеленый", "Фиолетовый"],
      correctAnswer: "Оранжевый",
    },
    {
      question: "Кто является автором 'Войны и мира'?",
      answers: ["Федор Достоевский", "Лев Толстой", "Антон Чехов"],
      correctAnswer: "Лев Толстой",
    },
  ];

const Quiz: React.FC = () => {
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

        {/* Кнопка "Закончить викторину", появляющаяся после ответов на все вопросы */}
        {allAnswered && (
          <div className={styles.scoreSection}>
            <button className={styles.submitButton}>Закончить викторину</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
