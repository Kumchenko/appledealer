import { IModels } from "@/interfaces";
import prisma from "@/lib/prisma";
import OrderPageView from "@/pages/OrderPage/OrderPageView";
import { fetchComponents } from "@/slices/ComponentSlice";

export default function Order({ models }: IModels) {
    return (
        <OrderPageView models={models} />
    )
}

export async function getStaticProps() {
    const models = await prisma?.model.findMany();
    return {
        props: {
            models
        }
    }
}