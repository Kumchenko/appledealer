import IndexPageView from "@/pages/IndexPage/IndexPageView"
import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function Index() {
    return (
        <IndexPageView />
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'uk', [
                'common',
                'index',
                'repair',
                'timer'
            ]))
        }
    }
}