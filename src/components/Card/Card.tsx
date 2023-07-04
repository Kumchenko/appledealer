import clsx from "clsx"
import { ICardProps } from "./interfaces"
import styles from './sass/Card.module.scss'
import { ForwardedRef, forwardRef } from "react";


const Card = forwardRef(({ title, titleClass, children, className, single = false }: ICardProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div
            className={clsx(styles.card, single && styles.single, className)}
            ref={ref}
        >
            {title ? <h5 className={clsx(styles.card__title, titleClass)}>{title}</h5> : null}
            {children}
        </div>
    )
})
Card.displayName = "Card"

export default Card;