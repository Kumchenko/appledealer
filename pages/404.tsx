import ErrorPageView from "@/pages/ErrorPage/ErrorPageView"
import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function ErrorPage() {
    return <ErrorPageView />
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'uk', [
                'common',
                'error'
            ]))
        }
    }
}