import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";
import { INavLink } from "./interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "next-i18next";
import { useState } from "react";

const NavLink = ({ point, styles, className }: INavLink) => {
    const { t } = useTranslation();
    const { pathname } = useRouter();

    // Initializing bool state for dropped list
    const [dropped, setDropped] = useState(false);

    // Destructuring point params
    const { href, title, subPoints, ...args } = point;

    // Handle mouseEnter event
    const handleMouseEnter = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setDropped(true);
        }
    }

    // Handle Enter key event
    const handleEnterKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setDropped(!dropped);
        }
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={() => setDropped(false)} >
            <Link href={href} legacyBehavior scroll={false}>
                <a className={clsx(styles?.menu__link, className, pathname === href && styles?.active)} {...args}>
                    {t(title)}
                </a>
            </Link>
            {subPoints ? (<>
                <FontAwesomeIcon
                    onClick={() => setDropped(!dropped)}
                    onKeyDown={handleEnterKey}
                    className={clsx(styles?.menu__arrow, dropped && styles?.dropped)}
                    tabIndex={0}
                    icon={faChevronDown}
                />
                <ul className={clsx(styles?.submenu__list, dropped && styles?.dropped)}>
                    {subPoints.map(subpoint => (
                        <li key={subpoint.href} className={styles?.submenu__item}>
                            <NavLink className={styles?.submenu__link} point={subpoint} />
                        </li>
                    ))}
                </ul>
            </>) : null}
        </div>
    )
}

export default NavLink;