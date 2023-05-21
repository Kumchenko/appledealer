import Head from "next/head"
import { Layout } from "@/layout"
import CheckSection from "@/components/CheckSection/CheckSection"

export default function CheckPageView() {
    return (
        <Layout>
            <Head>
                <title>Статус замовлення – AppleDealer</title>
            </Head>
            <CheckSection />
        </Layout>
    )
}