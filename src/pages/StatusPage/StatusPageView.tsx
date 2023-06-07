import StatusSection from "@/components/StatusSection/StatusSection"
import Head from "next/head"

export default function StatusPageView() {
    return (
        <>
            <Head>
                <title>Статус замовлення – AppleDealer</title>
            </Head>
            <StatusSection />
        </>
    )
}