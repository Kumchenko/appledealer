import { _apiBase } from "@/constants";
import { IModels, NextPageWithLayout } from "@/interfaces";
import MetaLayout from "@/layouts/MetaLayout";
import NavLayout from "@/layouts/NavLayout";
import TransitionLayout from "@/layouts/TransitionLayout";
import OrderPageView from "@/pages/OrderPage/OrderPageView";
import { fetchJSON } from "@/utils";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";

const Order: NextPageWithLayout<IModels> = ({ modelIds }) => {
    return (
        <OrderPageView modelIds={modelIds} />
    )
}

Order.getLayout = function getLayout(page: ReactElement) {
    return (
        <MetaLayout>
            <NavLayout>
                <TransitionLayout>
                    {page}
                </TransitionLayout>
            </NavLayout>
        </MetaLayout>
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const modelIds = await fetchJSON(`${_apiBase}/api/model/`);
    return {
        props: {
            modelIds,
            ...(await serverSideTranslations(locale ?? 'uk', [
                'common',
                'order',
                'repair'
            ])),
        },
        revalidate: 300
    }
}

export default Order