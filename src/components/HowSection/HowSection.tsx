import clsx from "clsx"
import styles from "./sass/How.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faPhone, faGear, faWrench, faSmile, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from "@/hooks"
import { useMemo } from "react"

const HowSection = () => {
    const { t: h } = useTranslation('index', { keyPrefix: 'how' });

    const actionItems = useMemo(() => {
        const actionIcons = [faReply, faPhone, faGear, faWrench, faSmile];
        const actions: string[] | null = h('actions', { returnObjects: true, defaultValue: null });
        return actions?.map((action, id) => (
            <li key={id} className={styles.how__item}>
                <span className={styles["how__iconWrapper"]}>
                    <FontAwesomeIcon className={styles.how__pic} icon={actionIcons[id] || faCircleExclamation} />
                </span>
                <p className={styles.how__text}>{action}</p>
            </li>
        ))
    }, [h])

    return (
        <section id="how" className={styles.how}>
            <div className={clsx(styles.container, 'container')}>
                <h2 className={styles.how__title}>{h('title')}</h2>
                <p className={styles.how__subtitle}>{h('subtitle')}</p>
                <ul className={styles.how__list}>
                    {actionItems}
                </ul>
            </div>
        </section>
    )
}

export default HowSection