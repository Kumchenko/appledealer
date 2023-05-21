import Head from "next/head"
import { Layout } from "@/layout"
import OrderSection from "@/components/OrderSection/OrderSection"

export default function OrderPageView() {
    return (
        <Layout>
            <Head>
                <title>Замовити ремонт – AppleDealer</title>
            </Head>
            <OrderSection />
        </Layout>
    )
}