import clsx from "clsx"
import { ICardProps } from "./interfaces"
import styles from './sass/Card.module.scss'


const Card = ({title, children, className, single = false, ...args}: ICardProps) => {
    return (
        <div {...args} className={clsx(styles.card, single && styles.card_single, className)}>
            <h5 className={styles.card__title}>{title}</h5>
            {children}
        </div>
    )
}

export default Card;