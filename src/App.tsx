import React from 'react';
import styles from './App.module.css'; 
import gsap from 'gsap';

import Start from './components/start/start';
import Quiz from './components/quiz/quiz';


const App: React.FC = () => {

  const tl = gsap.timeline()

  const closeStart = () => {
    tl.to("#statr", {opacity: 0, display: "none"})
      .to("#quiz", {opacity: 1, pointerEvents: "auto", display: "flex"})
  }
  

  return (
    <>
     <div className={styles.wrapper}>

      <div id="statr" className={styles.wrapperStart}>
        <Start><button onClick={closeStart}>Да</button></Start>
      </div>

      <div id="quiz" className={styles.wrapperQuiz}>
        <Quiz />
      </div>

     </div>
    </>
  )
}

export default App
