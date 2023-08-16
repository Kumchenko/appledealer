import { NextPageWithLayout } from '@/interfaces'
import NavLayout from '@/layouts/NavLayout'
import TransitionLayout from '@/layouts/TransitionLayout'
import ErrorPageView from '@/pages/ErrorPage/ErrorPageView'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { ReactElement } from 'react'

const ErrorPage: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title></title>
            </Head>
            <ErrorPageView />
        </>
    )
}

ErrorPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <NavLayout>
            <TransitionLayout>{page}</TransitionLayout>
        </NavLayout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'uk', ['common', 'error'])),
        },
    }
}

export default ErrorPage
