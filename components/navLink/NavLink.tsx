import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface NavLinkProps extends LinkProps, React.PropsWithChildren{
    activeClass?: string
    className?: string
    subLink?: boolean
}

const NavLink: React.FC<NavLinkProps> = ({children, href, activeClass, className, ...args}) => {
    const router = useRouter();
    
    return (
        <Link href={href} {...args} passHref>
            <a className={`${className} ${router.pathname === href && activeClass}`}>
                {children}
            </a>
        </Link>
    )
}

export default NavLink;