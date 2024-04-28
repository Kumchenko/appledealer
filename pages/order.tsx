import call from '@/api/call'
import { IModels, NextPageWithLayout } from '@/interfaces'
import MetaLayout from '@/layouts/MetaLayout'
import NavLayout from '@/layouts/NavLayout'
import TransitionLayout from '@/layouts/TransitionLayout'
import OrderPageView from '@/pages/Order/OrderPageView'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'

const Order: NextPageWithLayout<IModels> = ({ modelIds }) => {
    return <OrderPageView modelIds={modelIds} />
}

Order.getLayout = function getLayout(page: ReactElement) {
    return (
        <MetaLayout>
            <NavLayout>
                <TransitionLayout>{page}</TransitionLayout>
            </NavLayout>
        </MetaLayout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            modelIds: (await call.get('/models')).data,
            ...(await serverSideTranslations(locale ?? 'uk', ['common', 'order', 'repair'])),
        },
        revalidate: 300,
    }
}

export default Order
