import Image from 'next/image'
import Card from '../Card/Card'
import styles from './sass/ErrorSection.module.scss'
import Link from 'next/link'
import clsx from 'clsx'
import { useTranslation } from '@/hooks'

const ErrorSection = () => {
    const { t } = useTranslation();
    const { t: e } = useTranslation('error');
    return (
        <section>
            <div className="container">
                <h1 className={styles.error__title}>
                    <span className={styles.error__code}>404</span>
                    <span className={styles.error__name}>{t('errors.not-found')}</span>
                </h1>
                <Card className={styles.error__card} single={true}>
                    <div className={styles.error__imgWrapper}>
                        <Image
                            className={styles.error__img}
                            src="/img/error.gif"
                            alt={e('alt')}
                            layout='fill'
                        />
                    </div>
                    <p className={styles.error__desc}>
                        {e('detail')}
                    </p>
                    <Link href="/" legacyBehavior>
                        <a className={clsx(styles.card__btn, "btn btn_green")}>{t('to-main')}</a>
                    </Link>
                </Card>
            </div>
        </section>
    )
}

export default ErrorSection