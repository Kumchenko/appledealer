import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { NavPoints } from '@/constants'

const MetaLayout = ({ children }: React.PropsWithChildren) => {
    const router = useRouter()
    const { t } = useTranslation()

    const pageTranslationKey = NavPoints.find(navPoint => navPoint.href.startsWith(router.pathname))?.title

    return (
        <>
            <Head>
                <title>{pageTranslationKey ? t(pageTranslationKey) + ' – AppleDealer' : 'AppleDealer'}</title>
            </Head>
            {children}
        </>
    )
}

export default MetaLayout
