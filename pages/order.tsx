import Head from "next/head"
import OrderSection from "@/components/orderSection/OrderSection"

export default function orderPage() {
    return (
        <>
            <Head>
                <title>Замовити ремонт – AppleDealer</title>
            </Head>
            <OrderSection />
        </>
    )
}