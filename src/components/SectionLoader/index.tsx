import { MoonLoader } from 'react-spinners'
import styles from './sass/SectionLoader.module.scss'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'

export const SectionLoader = () => {
    const { t } = useTranslation()
    return (
        <div className={styles.loader}>
            <Head>
                <title>{t('loading')}</title>
            </Head>
            <MoonLoader />
        </div>
    )
}
