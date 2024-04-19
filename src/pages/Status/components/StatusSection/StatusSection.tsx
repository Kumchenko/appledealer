import clsx from 'clsx'
import styles from './sass/Status.module.scss'
import { idToString } from '@/utils'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from '@/api/store'
import Head from 'next/head'
import { useTranslation } from '@/hooks'
import { isNull, isString } from 'lodash'
import { getOrder } from '@/api/Order/OrderSlice'
import { SectionLoader } from '@/components/SectionLoader'
import { selectStatus } from '@/utils/selectors'
import { OrderCard } from '../OrderCard'

const StatusSection = () => {
    const { t: s } = useTranslation('status')
    const { t: r } = useTranslation('repair')

    const { order, isLoaded, isLoading, isError, isIdle } = useSelector(({ orderSlice }) => selectStatus(orderSlice))
    const dispatch = useDispatch()

    const router = useRouter()
    const { id, tel, thanks } = router.query

    const isOrderNotFetched = isNull(order) && isIdle
    const isAnotherOrderFetched = order && isString(id) && order.id !== parseInt(id)

    const formattedId = idToString(`${id}`)

    useEffect(() => {
        if ((isOrderNotFetched || isAnotherOrderFetched) && !isError) {
            if (isString(id) && isString(tel)) {
                dispatch(getOrder({ id, tel }))
            }
        }
    }, [dispatch, id, isAnotherOrderFetched, isError, isOrderNotFetched, tel])

    return (
        <section className={styles.result}>
            {isLoading && <SectionLoader />}
            {isLoaded && order && (
                <div className={clsx(styles.container, 'container')}>
                    <Head>
                        <title>{`${r('order')} ${formattedId} – AppleDealer`}</title>
                    </Head>
                    <h1 className={styles.result__title}>{thanks ? s('thanks-h1') : s('h1')}</h1>
                    <OrderCard order={order} isNew={!!thanks} />
                </div>
            )}
        </section>
    )
}

export default StatusSection
