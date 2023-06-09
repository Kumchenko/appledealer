import { useTranslation } from 'next-i18next';
import styles from './sass/Footer.module.scss';
import clsx from 'clsx';

export default function Footer() {
    const { t } = useTranslation()
    return (
        <footer className={styles.footer}>
            <div className={clsx(styles.container, "container")}>
                <a href="https://github.com/Kumchenko/appledealer" className={styles.footer__about} target="_blank" rel="noopener noreferrer">
                    {new Date().getFullYear()} — {t('footer.credentials')}
                </a>
            </div>
        </footer>
    )
}