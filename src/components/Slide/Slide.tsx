import clsx from "clsx";
import Image from "next/image";
import styles from './sass/Slide.module.scss';
import { ISlideProps } from "./interfaces";
import { useTranslation } from "@/hooks";
import Button from "../Button/Button";

const Slide = ({ title, desc, href, src, className, priority }: ISlideProps) => {
    const { t } = useTranslation();
    return (
        <div className={clsx(styles.slide, className)}>
            <div className={styles.slide__info}>
                <h4 className={styles.slide__title}>{title}</h4>
                <p className={styles.slide__desc}>
                    {desc}
                </p>
                <Button
                    className={styles.slide__more}
                    color='purple'
                    href={href}
                    target="_blank"
                >
                    {t('view')}
                </Button>
            </div>
            <div className={styles.slide__imgWrapper}>
                <Image
                    className={styles.slide__img}
                    priority={priority}
                    layout="fill"
                    src={src}
                    alt={title}
                />
            </div>
        </div>
    )
}

export default Slide