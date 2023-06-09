import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CheckPageView from "@/pages/CheckPage/CheckPageView"
import { GetStaticProps } from 'next';

export default function Check() {
    return (
        <CheckPageView />
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'uk', [
                'common',
                'check'
            ]))
        }
    }
}