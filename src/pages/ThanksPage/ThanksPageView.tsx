import ThanksSection from '@/components/ThanksSection/ThanksSection'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'

export default function ThanksPageView() {
    const { t } = useTranslation('thanks')
    return (
        <>
            <Head>
                <title>{t('h1')} – AppleDealer</title>
            </Head>
            <ThanksSection />
        </>
    )
}
