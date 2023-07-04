import { IModels, NextPageWithLayout } from "@/interfaces";
import MetaLayout from "@/layouts/MetaLayout";
import NavLayout from "@/layouts/NavLayout";
import TransitionLayout from "@/layouts/TransitionLayout";
import prisma from "@/lib/prisma";
import OrderPageView from "@/pages/OrderPage/OrderPageView";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";

const Order: NextPageWithLayout<IModels> = ({ models }) => {
    return (
        <OrderPageView models={models} />
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
    const models = await prisma?.model.findMany({
        orderBy: { id: "asc" }
    });
    return {
        props: {
            models: models.sort(),
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