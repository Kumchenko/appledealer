import clsx from "clsx"
import { ICardProps } from "./interfaces"
import styles from './sass/Card.module.scss'


const Card = ({title, titleClass, children, className, single = false, ...args}: ICardProps) => {
    return (
        <div {...args} className={clsx(styles.card, single && styles.card_single, className)}>
            {title ? <h5 className={clsx(styles.card__title, titleClass)}>{title}</h5> : null}
            {children}
        </div>
    )
}

export default Card;