import clsx from 'clsx'
import styles from './sass/Discount.module.scss'
import Timer from '../Timer/Timer'
import { useMemo } from 'react'
import { useTranslation } from '@/hooks';
import Link from 'next/link';

const DiscountSection = () => {
    const { t: o } = useTranslation('index', { keyPrefix: 'offer' });
    const { t: r } = useTranslation('repair');
    // Temporary solution when there isn't backend
    const time = useMemo(() => {
        // 12000
        return Date.now() + 86400000
    }, []);

    return (
        <section id="discount" className={styles.discount}>
            <div className={clsx(styles.container, styles.grid, "container grid")}>
                <h2 className={styles.discount__title}>
                    {o('title')} -5%
                </h2>
                <h3 className={styles.discount__subtitle}>
                    {o('remains')}:
                </h3>
                <p className={styles.discount__desc}>
                    {o('desc')}: {r('display')}
                </p>
                <Link href="/order" passHref>
                    <a className={clsx(styles.discount__order, "btn btn_green")}>{o('submit')}</a>
                </Link>
                <Timer date={time} ended={o('ended')} />
            </div>
        </section>
    )
}

export default DiscountSection