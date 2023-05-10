import Head from "next/head"
import AboutSection from "@/components/aboutSection/AboutSection"
import DiscountSection from "@/components/discountSection/DiscountSection"
import WorksSection from "@/components/worksSection/WorksSection"
import HowSection from "@/components/howSection/HowSection"

export default function Page() {
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