import Head from "next/head"
import CheckSection from "@/components/checkSection/CheckSection"

export default function checkPage() {
    return (
        <>
            <Head>
                <title>Статус замовлення – AppleDealer</title>
            </Head>
            <CheckSection />
        </>
    )
}