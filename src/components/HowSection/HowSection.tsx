import clsx from "clsx"
import styles from "./sass/How.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faPhone, faGear, faWrench, faSmile } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "next-i18next"

const HowSection = () => {
    const { t: i } = useTranslation('index');
    return (
        <section id="how" className={styles.how}>
            <div className={clsx(styles.container, 'container')}>
                <h2 className={styles.how__title}>{i('how.title')}</h2>
                <p className={styles.how__subtitle}>{i('how.subtitle')}</p>
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