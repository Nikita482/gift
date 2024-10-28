import styles from "./start.module.css"
import { ReactNode } from "react";
import gsap from "gsap";


interface props{
    children: ReactNode;
}

const Start: React.FC<props> = ({children}) => {

    const tl = gsap.timeline()

    const clickNo = () => {
        tl.to("#btnNo", {scale: 0})
          .to("#btnYes", {marginLeft: "-100%"})
    }

    return(
        <>
            <div className={styles.wrapper}>
                <div className={styles.wrapperInfo}>
                    <h1>Эй, ты любишь баскетбол?</h1>

                    <div className={styles.basketballs}>
                        <ion-icon name="basketball"></ion-icon>
                        <ion-icon name="basketball"></ion-icon>
                        <ion-icon name="basketball"></ion-icon>
                        <ion-icon name="basketball"></ion-icon>
                    </div>

                    <p>К сожалению, какие-то козлы украли наш любимый баскетбольный мяч! Помоги вернуть его, преодолевая забавные препятствия и решая головоломки. Готов ли ты спасти мяч?</p>

                    <div className={styles.infoBtn}>
                        <button id="btnNo" className={styles.btnNo} onClick={clickNo}>Нет</button>
                        <div id="btnYes" className={styles.btnYes}>{children}</div>
                    </div>
                </div>

                <div className={styles.wrapperFoto}>
                    <div className={styles.foto}></div>
                </div>
            </div>
        </>
    )
}

export default Start;