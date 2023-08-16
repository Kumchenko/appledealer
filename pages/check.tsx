import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CheckPageView from '@/pages/CheckPage/CheckPageView'
import { GetStaticProps } from 'next'
import { ReactElement } from 'react'
import NavLayout from '@/layouts/NavLayout'
import MetaLayout from '@/layouts/MetaLayout'
import TransitionLayout from '@/layouts/TransitionLayout'
import { NextPageWithLayout } from '@/interfaces'

const Check: NextPageWithLayout = () => {
    return <CheckPageView />
}

Check.getLayout = function getLayout(page: ReactElement) {
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
            ...(await serverSideTranslations(locale ?? 'uk', ['common', 'check'])),
        },
    }
}

export default Check
