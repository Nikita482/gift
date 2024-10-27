import styles from "./start.module.css"
import { ReactNode } from "react";


interface props{
    children: ReactNode;
}

const Start: React.FC<props> = ({children}) => {
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

                    <p>К сожалению, козлы украли наш любимый баскетбольный мяч! Помоги вернуть его, преодолевая забавные препятствия и решая головоломки. Готов спасти мяч?</p>

                    <div className={styles.infoBtn}>
                        <button>Нет</button>
                        {children}
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