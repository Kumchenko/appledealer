import Image from 'next/image'
import clsx from 'clsx'
import styles from './sass/Thanks.module.scss'
import Card from '../Card/Card'
import { useSelector } from '@/store'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { idToString } from '@/utils'
import { useTranslation } from '@/hooks'
import Button from '../Button/Button'
import Head from 'next/head'

const ThanksSection = () => {
    const { t } = useTranslation('thanks')
    const { t: r } = useTranslation('repair')
    const { t: c } = useTranslation()

    const router = useRouter()
    const { order, loadingStatus } = useSelector(({ orderSlice }) => orderSlice)

    // Redirect when no info about order in slice
    useEffect(() => {
        if (loadingStatus !== 'fetched') {
            router.push('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className={styles.thanks}>
            <div className={clsx(styles.container, 'container')}>
                <h1 className={styles.thanks__title}>{t('h1')}</h1>
                <Card
                    title={`${t('repair:order')} ${order?.id ? idToString(order.id) : 0}`}
                    className={styles.card}
                    single={true}
                >
                    <p className={styles.card__subtitle}>{t('will-contact')}</p>
                    <Image
                        className={styles.card__img}
                        width={320}
                        height={260}
                        quality={90}
                        priority={true}
                        src={
                            order?.service.modelId
                                ? `/img/iphones/${order.service.modelId}.jpg`
                                : `/img/iphones/empty.jpg`
                        }
                        alt={order?.service.modelId}
                    />
                    <div className={styles.card__about}>
                        <p className={styles.bolder}>
                            {r(order?.service.modelId)} — {r(order?.service.componentId)}
                        </p>
                        <p>
                            {c('quality')}: {r(order?.service.qualityId)}
                        </p>
                        <p>
                            {c('cost')}: {order?.cost}₴
                        </p>
                    </div>
                    <Button href="/" className={styles.card__btn} color="green">
                        {c('to-main')}
                    </Button>
                </Card>
            </div>
        </section>
    )
}

export default ThanksSection
