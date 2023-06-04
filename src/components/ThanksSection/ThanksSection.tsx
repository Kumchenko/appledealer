import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import styles from './sass/Thanks.module.scss'
import Card from '../Card/Card';
import { useSelector } from '@/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ThanksSection = () => {
    const router = useRouter();
    const { order, loadingStatus } = useSelector(({ orderSlice }) => orderSlice);

    // Redirect when no info about order in slice
    useEffect(() => {
        if (loadingStatus !== 'fetched') {
            router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className={styles.thanks}>
            <div className={clsx(styles.container, "container")}>
                <h1 className={styles.thanks__title}>
                    Дякуємо за замовлення!
                </h1>
                <Card title={`Замовлення ${order?.id ? formatId(order.id) : 0}`} className={styles.card} single={true}>
                    <p className={styles.card__subtitle}>
                        Наш менеджер зв’яжеться з вами для уточнення умов
                    </p>
                    <Image
                        className={styles.card__img}
                        width={320}
                        height={260}
                        quality={90}
                        priority={true}
                        src={order?.model ? `/img/iphones/${order.model}.png` : `/img/iphones/empty.png`}
                        alt={order?.model}
                    />
                    <p className={styles.card__about}>
                        <span>{order?.model} — {order?.component}</span>
                        Вартість: {order?.cost}₴
                    </p>
                    <Link href="/" passHref>
                        <a className={clsx(styles.card__btn, "btn btn_green")}>
                            На головну
                        </a>
                    </Link>
                </Card>
            </div>
        </section>
    )
}

const formatId = (id: number | string) => {
    const res = id.toString().split('');
    const length = res.length
    for (let i = 0; i < (4 - length); i++) {
        res.unshift('0');
    }
    return res.join('');
}

export default ThanksSection;