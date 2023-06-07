import Head from "next/head"
import OrderSection from "@/components/OrderSection/OrderSection"
import { IModels } from "@/interfaces"

export default function OrderPageView({models}: IModels) {
    return (
        <>
            <Head>
                <title>Замовити ремонт – AppleDealer</title>
            </Head>
            <OrderSection models={models}/>
        </>
    )
}