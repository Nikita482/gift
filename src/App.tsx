import React from 'react';
import styles from './App.module.css'; 
import gsap from 'gsap';

import Start from './components/start/start';
import Quiz from './components/quiz/quiz';
import Number from './components/number/number';
import Play from './components/play/play';
import Footer from './components/footer/footer';


const App: React.FC = () => {

  const tl = gsap.timeline()

  const closeStart = () => {
    tl.to("#statr", {opacity: 0, display: "none"})
      .to("#quiz", {opacity: 1, pointerEvents: "auto", display: "flex"})
  }
  
  const quizBtn = () => {
    tl.to("#quiz", {opacity: 0, display: "none"})
      .to("#number", {display: "flex", opacity: 1})
  }

  const ckickFurther = () => {
    tl.to("#number", {opacity: 0, display: "none"})
      .to("#Play", {display: "flex", opacity: 1})
  }

  const ckickPlay = () => {
    tl.to("#Play", {opacity: 0, display: "none"})
      .to("#Footer", {display: "flex", opacity: 1})
  }
  

  return (
    <>
     <div className={styles.wrapper}>

      <div id="statr" className={styles.wrapperStart}>
        <Start><button onClick={closeStart}>Да</button></Start>
      </div>

      <div id="quiz" className={styles.wrapperQuiz}>
        <Quiz>
          <button onClick={quizBtn} className={styles.submitButton}>Далее</button>
        </Quiz>
      </div>

      <div id="number" className={styles.wrapperNumber}>
        <Number>
          <button onClick={ckickFurther}>Далее</button>
        </Number>
      </div>

      <div id="Play" className={styles.wrapperPlay}>
        <Play>
          <button onClick={ckickPlay}>Далее</button>
        </Play>
      </div>

      <div id="Footer" className={styles.wrapperFooter}>
        <Footer />
      </div>
     </div>
    </>
  )
}

export default App
