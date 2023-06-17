import Head from "next/head"
import AboutSection from "@/components/AboutSection/AboutSection"
import DiscountSection from "@/components/DiscountSection/DiscountSection"
import WorksSection from "@/components/WorksSection/WorksSection"
import HowSection from "@/components/HowSection/HowSection"

export default function IndexPageView() {
    return (
        <>
            <Head>
                <title>Про нас – AppleDealer</title>
            </Head>
            <AboutSection />
            <DiscountSection />
            <WorksSection />
            <HowSection />
        </>
    )
}