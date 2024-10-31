import React, { useEffect, useState } from 'react';
import styles from './play.module.css';
import { gsap } from 'gsap';

interface Props {
  children?: React.ReactNode;
}

interface Card {
  id: number;
  content: string;
  matched: boolean;
}

// 18 пар карточек (A-R)
const initialCards: Card[] = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  content: String.fromCharCode(65 + Math.floor(index / 2)), // A, A, B, B, C, C, ... до R
  matched: false,
}));

const shuffleCards = (cards: Card[]): Card[] => {
  return cards.sort(() => Math.random() - 0.5);
};

const Play: React.FC<Props> = ({ children }) => {
  const [cards, setCards] = useState<Card[]>(shuffleCards([...initialCards]));
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsAnimating(true);
      const [firstIndex, secondIndex] = flippedCards;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      // Проверка на совпадение
      if (firstCard.content === secondCard.content) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.content === firstCard.content ? { ...card, matched: true } : card
          )
        );
      } else {
        gsap.to(`#card-${firstIndex} .${styles.cardInner}`, { rotationY: 0, delay: 1 });
        gsap.to(`#card-${secondIndex} .${styles.cardInner}`, { rotationY: 0, delay: 1 });
      }

      setTimeout(() => {
        setFlippedCards([]);
        setIsAnimating(false);
      }, 1000);
    }
  }, [flippedCards]);

  const handleCardClick = (index: number) => {
    if (!isAnimating && flippedCards.length < 2 && !cards[index].matched && !flippedCards.includes(index)) {
      gsap.to(`#card-${index} .${styles.cardInner}`, { rotationY: 180 });
      setFlippedCards([...flippedCards, index]);
    }
  };

  // Проверяем, все ли карточки собраны
  const allCardsMatched = cards.every(card => card.matched);

  return (
    <div className={styles.container}>
        <div className={styles.instructions}>Теперь найди все пары карточек, чтобы выиграть!</div>
            
        <div className={styles.grid}>
            {cards.map((card, index) => (
                <div key={card.id} id={`card-${index}`} onClick={() => handleCardClick(index)}className={`${styles.card} ${card.matched ? styles.matched : ''}`}>
                    <div className={styles.cardInner}>
                        <div className={styles.cardFront}></div>
                        <div className={styles.cardBack}>{card.content}</div>
                    </div>
                </div>
            ))}
        </div>

        {allCardsMatched && (
            <div className={styles.buttonContainer}>
                {children}
            </div>
        )}
    </div>
  );
};

export default Play;
