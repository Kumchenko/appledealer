import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavLink from '../navLink/NavLink'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import styles from './header.module.scss'

export default function Header() {
    const [menuOpened, setMenuOpened] = useState(false);
    const toggleMenu = () => {
        setMenuOpened(!menuOpened);
    }
    return (
        <header className={styles.header}>
            <div className={styles.info}>
                <div className={clsx(styles.container, 'container')}>
                    <address className={styles.info__address}>
                        <a href="https://goo.gl/maps/XLexykR1npzgqB2R7" target="_blank" rel="noopener noreferrer">
                            Дніпро, вул. Якова Самарського 7
                        </a>
                    </address>
                    <button className={clsx('btn btn_green')}>Звʼязатися</button>
                </div>
            </div>
            <nav className={clsx({[styles.menu]: true, [styles.menu_opened]: menuOpened})}>
                <div className={clsx(styles.container, 'container')}>
                    <Link href="/">
                        <a className={styles.logo__link}>
                            <Image layout='fill' src="/img/logo.svg" alt="AppleDealer" className={styles.logo__img} />
                        </a>
                    </Link>
                    <ul className={styles.menu__list}>
                        <li className={styles.menu__item}>
                            <NavLink href="/" className={styles.menu__link} activeClass={styles.active}>
                                Про нас
                            </NavLink>
                            <span className={styles.menu__arrow}></span>
                            <ul className={styles.submenu__list}>
                                <li className={styles.submenu__item}>
                                    <Link href="/#about" scroll={false} passHref>
                                        Контактна інформація
                                    </Link>
                                </li>
                                <li className={styles.submenu__item}>
                                    <Link href="/#discount" scroll={false} passHref>
                                        <a className={styles.submenu__link}>Спеціальна пропозиція</a>
                                    </Link>
                                </li>
                                <li className={styles.submenu__item}>
                                    <Link href="/#works" scroll={false} passHref>
                                        <a className={styles.submenu__link}>Наше кредо - якість!</a>
                                    </Link>
                                </li>
                                <li className={styles.submenu__item}>
                                    <Link href="/#how" scroll={false} passHref>
                                        <a className={styles.submenu__link}>Як ми працюємо?</a>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className={styles.menu__item}>
                            <NavLink href="/order" className={styles.menu__link} activeClass={styles.active}>
                                Замовити ремонт
                            </NavLink>
                        </li>
                        <li className={styles.menu__item}>
                            <NavLink href="/check" className={styles.menu__link} activeClass={styles.active}>
                                Статус замовлення
                            </NavLink>
                        </li>
                    </ul>
                    <a className={styles.social__link}
                        href="https://www.instagram.com/appledealer_ua/"
                        target="_blank"
                        rel="noopener noreferrer">
                        <FontAwesomeIcon className={styles.social__logo} icon={faInstagram} />
                    </a>
                    <div className={styles.menu__burger} onClick={toggleMenu}>
                        <span></span>
                    </div>
                </div>
            </nav>
        </header >
    )
}