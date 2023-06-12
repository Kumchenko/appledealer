import clsx from "clsx";
import Image from "next/image";
import styles from './sass/Slide.module.scss';
import { ISlideProps } from "./interfaces";
import { useTranslation } from "@/hooks/useTranslation";

const Slide = ({ title, desc, href, src, className, ...args }: ISlideProps) => {
    const { t } = useTranslation();
    return (
        <div className={clsx(styles.slide, className)} {...args}>
            <div className={styles.slide__info}>
                <h4 className={styles.slide__title}>{title}</h4>
                <p className={styles.slide__desc}>
                    {desc}
                </p>
                <a
                    className={clsx(styles.slide__more, "btn btn_purple")}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer">
                    {t('view')}
                </a>
            </div>
            <div className={styles.slide__imgWrapper}>
                <Image className={styles.slide__img} layout="fill" src={src} alt={title} />
            </div>
        </div>
    )
}

export default Slide