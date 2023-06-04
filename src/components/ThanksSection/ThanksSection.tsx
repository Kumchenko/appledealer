import Image from 'next/image';
import clsx from 'clsx';
import styles from './sass/Thanks.module.scss'
import Card from '../Card/Card';

const ThanksSection = () => {
    return (
        <section className={styles.thanks}>
            <div className={clsx(styles.container, "container")}>
                <h1 className={styles.thanks__title}>
                    Дякуємо за замовлення!
                </h1>
                <Card title='Замовлення 0013' className={styles.card} single={true}>
                    <p className={styles.card__subtitle}>
                        Наш менеджер зв’яжеться з вами для уточнення умов
                    </p>
                    <Image className={styles.card__img} width={320} height={260} quality={90} priority={true} src="/img/iphones/iphone-13-mini.png" alt="iPhone 13 Mini" />
                    <p className={styles.card__about}>
                        <span>iPhone 13 Mini — Дисплей</span>
                        Вартість: 6000₴
                    </p>
                    <a className={clsx(styles.card__btn, "btn btn_green")} href="./">На головну</a>
                </Card>
            </div>
        </section>
    )
}

export default ThanksSection;