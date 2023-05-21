import { LinkProps } from "next/link";

export interface INavLink extends LinkProps, React.PropsWithChildren{
    activeClass?: string
    className?: string
    subLink?: boolean
}