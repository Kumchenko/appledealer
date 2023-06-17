import ThanksPageView from "@/pages/ThanksPage/ThanksPageView"
import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export default function Check() {
    return (
        <ThanksPageView />
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'uk', [
                'common',
                'thanks',
                'repair'
            ]))
        }
    }
}