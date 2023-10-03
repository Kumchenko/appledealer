import { NextPageWithLayout } from '@/interfaces'
import MetaLayout from '@/layouts/MetaLayout'
import NavLayout from '@/layouts/NavLayout'
import TransitionLayout from '@/layouts/TransitionLayout'
import StatusPageView from '@/pages/StatusPage/StatusPageView'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'

const Status: NextPageWithLayout = () => {
    return <StatusPageView />
}

Status.getLayout = function getLayout(page: ReactElement) {
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
            ...(await serverSideTranslations(locale ?? 'uk', ['common', 'status', 'repair'])),
        },
    }
}

export default Status
