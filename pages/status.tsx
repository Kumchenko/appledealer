import StatusPageView from "@/pages/StatusPage/StatusPageView";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Status = () => {
    return (
        <StatusPageView />
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'uk', [
                'common',
                'status',
                'repair'
            ]))
        }
    }
}

export default Status;