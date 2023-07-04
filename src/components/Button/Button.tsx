import clsx from "clsx"
import styles from "./sass/Button.module.scss"
import { IButton } from "./interfaces"
import { forwardRef } from "react"
import { useRouter } from "next/router";

const Button = forwardRef<HTMLButtonElement, IButton>(({
    className,
    type,
    disabled,
    children,
    color,
    onClick,
    href,
    target
}, ref) => {
    const router = useRouter();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
            onClick(e)
        }
        if (href) {
            if (href.startsWith('.') || href.startsWith('/')) {
                router.push(href)
            } else {
                window.open(href, target)
            }
        }
    }
    return (
        <button
            ref={ref}
            className={clsx(styles.btn, className, styles[color])}
            type={type}
            disabled={disabled}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}
);
Button.displayName = 'Button'

export default Button