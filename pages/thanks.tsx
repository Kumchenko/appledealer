import { NextPageWithLayout } from '@/interfaces'
import NavLayout from '@/layouts/NavLayout'
import TransitionLayout from '@/layouts/TransitionLayout'
import ThanksPageView from '@/pages/ThanksPage/ThanksPageView'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'

const Thanks: NextPageWithLayout = () => {
    return <ThanksPageView />
}

Thanks.getLayout = function getLayout(page: ReactElement) {
    return (
        <NavLayout>
            <TransitionLayout>{page}</TransitionLayout>
        </NavLayout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'uk', ['common', 'thanks', 'repair'])),
        },
    }
}

export default Thanks
