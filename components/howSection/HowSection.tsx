import clsx from "clsx"
import styles from "./how.module.scss"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faPhone, faGear, faWrench, faSmile } from '@fortawesome/free-solid-svg-icons'

const HowSection = () => {
    return (
        <section id="how" className={styles.how}>
            <div className={clsx(styles.container, 'container')}>
                <h2 className={styles.how__title}>Як ми працюємо?</h2>
                <p className={styles.how__subtitle}>Наш простий та надійний алгоритм роботи</p>
                <ul className={styles.how__list}>
                    <li className={styles.how__item}>
                        <span className={styles["how__icon-wrapper"]}>
                            <FontAwesomeIcon className={styles.how__pic} icon={faReply} />
                        </span>
                        <p className={styles.how__text}>Ви відправляєте запит з описом наявної проблеми</p>
                    </li>
                    <li className={styles.how__item}>
                        <span className={styles["how__icon-wrapper"]}>
                            <FontAwesomeIcon className={styles.how__pic} icon={faPhone} />
                        </span>
                        <p className={styles.how__text}>Наш менеджер телефонує вам для уточнень та погодження подальших дій</p>
                    </li>
                    <li className={styles.how__item}>
                        <span className={styles["how__icon-wrapper"]}>
                            <FontAwesomeIcon className={styles.how__pic} icon={faGear} />
                        </span>
                        <p className={styles.how__text}>Проводимо діагностику вашого пристрою та погоджуємо необхідний ремонт</p>
                    </li>
                    <li className={styles.how__item}>
                        <span className={styles["how__icon-wrapper"]}>
                            <FontAwesomeIcon className={styles.how__pic} icon={faWrench} />
                        </span>
                        <p className={styles.how__text}>Здійснюємо професійний ремонт та необхідне тестування</p>
                    </li>
                    <li className={styles.how__item}>
                        <span className={styles["how__icon-wrapper"]}>
                            <FontAwesomeIcon className={styles.how__pic} icon={faSmile} />
                        </span>
                        <p className={styles.how__text}>Отримуєте цілком справний пристрій і щасливий ним користуєтесь :)</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default HowSection