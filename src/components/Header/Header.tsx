import { useEffect, useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavLink from '@/components/NavLink/NavLink'
import clsx from 'clsx'
import styles from './sass/Header.module.scss'
import { useRouter } from 'next/router'
import { useTranslation } from "next-i18next"
import { IHeaderProps } from './interfaces'

const Header = ({ navPoints, socialPoints }: IHeaderProps) => {
    const { t } = useTranslation();
    const [navOpened, setNavOpened] = useState(false);
    const router = useRouter();

    const closeNav = useCallback(() => {
        if (navOpened) {
            setNavOpened(false);
        }
    }, [navOpened]);

    // Closing opened navigation menu when changing page
    useEffect(() => {
        router.events.on('routeChangeStart', closeNav)
        router.events.on('hashChangeStart', closeNav)
    }, [router, closeNav]);

    // Prepare navigation links
    const navElems = useMemo(() => navPoints.map(point =>
        <li key={point.href} className={styles.menu__item}>
            <NavLink styles={styles} point={point} />
        </li>
    ), [navPoints])

    // Prepare social networks links
    const socialElems = useMemo(() => socialPoints.map(({ href, child }) =>
        <li key={href} className={styles.social__item}>
            <a href={href} target="_blank" rel="noopener noreferrer" >
                {child}
            </a>
        </li>
    ), [socialPoints])

    // Prepare language changing links
    const langElems = useMemo(() => router.locales?.map(locale =>
        <li className={clsx(styles.lang__item, locale == router.locale && styles.active)} key={locale}>
            <Link href={router.pathname} locale={locale}>
                {t(locale)}
            </Link>
        </li>
    ), [router.locale, router.locales, router.pathname, t])

    return (
        <header className={styles.header}>
            <div className={styles.info}>
                <div className={clsx(styles.container, 'container')}>
                    <address className={styles.info__address}>
                        <a href="https://goo.gl/maps/XLexykR1npzgqB2R7" target="_blank" rel="noopener noreferrer">
                            {t('address')}
                        </a>
                    </address>
                    <button className={clsx('btn btn_green')}>{t('call-me')}</button>
                </div>
            </div>
            <nav className={clsx(styles.menu, navOpened && styles.menu_opened)}>
                <div className={clsx(styles.container, 'container')}>
                    <Link href="/">
                        <a className={styles.logo__link}>
                            <Image width={110} height={50} priority={true} src="/img/logo.svg" alt="AppleDealer" className={styles.logo__img} />
                        </a>
                    </Link>
                    <ul className={styles.menu__list}>
                        {navElems}
                        <div className={styles.menu__other}>
                            <ul className={styles.social__list}>
                                {socialElems}
                            </ul>
                            <ul className={styles.lang__list}>
                                {langElems}
                            </ul>
                        </div>
                    </ul>
                    <div className={styles.menu__burger} onClick={() => setNavOpened(!navOpened)}>
                        <span></span>
                    </div>
                </div>
            </nav>
        </header >
    )
}

export default Header