import Button from '@/components/Button/Button'
import Card from '@/components/Card/Card'
import router from 'next/router'
import Image from 'next/image'
import order from 'pages/order'
import { IOrder } from '@/interfaces'
import styles from './sass/OrderCard.module.scss'
import emptyPhone from 'public/img/iphones/empty.jpg'
import { idToString } from '@/utils'
import useTranslation, { useRepairTranslation, useStatusPageTranslation } from '@/hooks/useTranslation'

export const OrderCard = ({ order, isNew }: { order: IOrder; isNew: boolean }) => {
    const { t } = useTranslation()
    const { t: r } = useRepairTranslation()
    const { t: s } = useStatusPageTranslation()

    const formattedId = idToString(`${order.id}`)

    return (
        <Card
            className={styles.card}
            titleClass={styles.card__title}
            title={`${r('order')} ${formattedId}`}
            single={true}
        >
            {isNew && <p className={styles.card__subtitle}>{s('will-contact')}</p>}
            <div className={styles.card__imgWrapper}>
                <Image
                    layout="fill"
                    priority={true}
                    quality={90}
                    src={order.service.modelId ? `/img/iphones/${order.service.modelId}.jpg` : emptyPhone}
                    alt={r(order.service.modelId)}
                />
            </div>
            <ul className={styles.card__list}>
                <li className={styles.card__item}>
                    <span>{r('CREATED')}</span>
                    {new Date(order?.created || 0).toLocaleString(router.locale)}
                </li>
                {order.operations.map(operation => {
                    return (
                        <li key={operation.status} className={styles.card__item}>
                            <span>{r(operation.status)}</span>
                            {new Date(operation.dateTime).toLocaleString(router.locale)}
                        </li>
                    )
                })}
            </ul>
            <div className={styles.card__about}>
                <p className={styles.bolder}>
                    {r(order.service.modelId)} — {r(order.service.componentId)}
                </p>
                <p>
                    {t('quality')}: {r(order.service.qualityId)}
                </p>
                <p>
                    {t('cost')}: {order.cost}₴
                </p>
            </div>
            <Button className={styles.card__btn} color="purple" href="/check">
                {t('back')}
            </Button>
            <Button className={styles.card__btn} color="green" href="/">
                {t('to-main')}
            </Button>
        </Card>
    )
}
