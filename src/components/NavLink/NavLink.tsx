import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";
import { INavLink } from "./interfaces";


const NavLink = ({children, href, activeClass, className, ...args}: INavLink) => {
    const router = useRouter();
    return (
        <Link href={href} {...args} passHref>
            <a className={clsx(className, router.pathname === href && activeClass)}>
                {children}
            </a>
        </Link>
    )
}

export default NavLink;