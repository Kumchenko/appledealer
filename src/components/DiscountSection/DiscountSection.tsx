import clsx from 'clsx'
import styles from './sass/Discount.module.scss'
import Timer from '../Timer/Timer'
import { useMemo } from 'react'
import { useTranslation } from 'next-i18next'

const DiscountSection = () => {
    const {t: i} = useTranslation('index');
    const {t: r} = useTranslation('repair');
    // Temporary solution when there isn't backend
    const time = useMemo(() => {
        // 86400000
        return Date.now() + 12000
    }, []);

    return (
        <section id="discount" className={styles.discount}>
            <div className={clsx(styles.container, styles.grid, "container grid")}>
                <h2 className={styles.discount__title}>
                    {i('offer.title')} -5%
                </h2>
                <h3 className={styles.discount__subtitle}>
                    {i('offer.remains')}:
                </h3>
                <p className={styles.discount__desc}>
                    {i('offer.desc')}: {r('display')}
                </p>
                <button className={clsx(styles.discount__order, "btn btn_green")}>{i('offer.submit')}</button>
                <Timer date={time} ended={i('offer.ended')}/>
            </div>
        </section>
    )
}

export default DiscountSection