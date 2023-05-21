import clsx from 'clsx'
import styles from './sass/Discount.module.scss'
import Timer from '../Timer/Timer'
import { useMemo } from 'react'

const DiscountSection = () => {
    // Temporary solution when there isn't backend
    const time = useMemo(() => {
        // 86400000
        return Date.now() + 12000
    }, []);

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
                <Timer date={time} />
            </div>
        </section>
    )
}

export default DiscountSection