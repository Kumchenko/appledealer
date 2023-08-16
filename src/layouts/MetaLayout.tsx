import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { NavPoints } from '@/constants'

const MetaLayout = ({ children }: React.PropsWithChildren) => {
    const router = useRouter()
    const { t } = useTranslation()

    const metaTitle =
        t(NavPoints.filter(navPoint => navPoint.href.startsWith(router.pathname)).map(navTitle => navTitle.title)[0]) +
        ' – AppleDealer'

    return (
        <>
            <Head>{metaTitle ? <title>{metaTitle}</title> : null}</Head>
            {children}
        </>
    )
}

export default MetaLayout
