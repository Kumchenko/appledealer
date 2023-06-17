import { IModels } from "@/interfaces";
import prisma from "@/lib/prisma";
import OrderPageView from "@/pages/OrderPage/OrderPageView";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Order({ models }: IModels) {
    return (
        <OrderPageView models={models} />
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const models = await prisma?.model.findMany();
    return {
        props: {
            models,
            ...(await serverSideTranslations(locale ?? 'uk', [
                'common',
                'order',
                'repair'
            ]))
        }
    }
}