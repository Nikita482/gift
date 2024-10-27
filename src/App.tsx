import React from 'react';
import styles from './App.module.css'; 
import gsap from 'gsap';

import Start from './components/start/start';

const App: React.FC = () => {

  const closeStart = () => {
    gsap.to("#statr", {opacity: 0})
  }

  return (
    <>
     <div className={styles.wrapper}>

      <div id="statr" className={styles.wrapperStart}>
        <Start><button onClick={closeStart}>Да</button></Start>
      </div>
      
     </div>
    </>
  )
}

export default App
