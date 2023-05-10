import clsx from 'clsx'
import styles from './discount.module.scss'

const DiscountSection = () => {
    return (
        <section id="discount" className={styles.discount}>
            <div className={clsx(styles.container, styles.grid, "container grid")}>
                <h2 className={styles.discount__title}>
                    Спеціальна пропозиція -5%
                </h2>
                <h3 className={styles.discount__subtitle}>
                    Час дії пропозиції:
                </h3>
                <p className={styles.discount__desc}>
                    Знижка на ремонт компоненту: Дисплей
                </p>
                <button className={clsx(styles.discount__order, "btn btn_green")}>Замовити ремонт</button>

                {/* <div className={styles.timer}>
                    <div className={styles.timer__field}>
                        <div className={styles.timer__count}>2</div>
                        <span className={styles.timer__label}>Днів</span>
                    </div>
                    <div className={styles.timer__field}>
                        <div className={styles.timer__count}>5</div>
                        <span className={styles.timer__label}>Годин</span>
                    </div>
                    <div className={styles.timer__field}>
                        <div className={styles.timer__count}>17</div>
                        <span className={styles.timer__label}>Хвилин</span>
                    </div>
                    <div className={styles.timer__field}>
                        <div className={styles.timer__count}>38</div>
                        <span className={styles.timer__label}>Секунд</span>
                    </div>
                </div> */}
            </div>
        </section>
    )
}

export default DiscountSection