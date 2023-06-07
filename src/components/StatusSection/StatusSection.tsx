import clsx from "clsx";
import Card from "../Card/Card";
import Link from "next/link";
import Image from "next/image";
import styles from "./sass/Status.module.scss";
import { idToString } from "@/utils";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useSelector } from "@/store";
import Head from "next/head";

const StatusSection = () => {
    const router = useRouter();
    const { order, loadingStatus } = useSelector(({ orderSlice }) => orderSlice);
    const id = useMemo(() => idToString(order?.id ? order.id : 0), []);

    // Redirect when no info about order in slice
    useEffect(() => {
        if (loadingStatus !== 'fetched') {
            router.push('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className={styles.result}>
            <Head>
                <title>Замовлення {id} – AppleDealer</title>
            </Head>
            <div className={clsx(styles.container, "container")}>
                <h1 className={styles.result__title}>
                    Статус замовлення
                </h1>
                <Card
                    className={styles.card}
                    titleClass={styles.card__title}
                    title={`Замовлення ${id}`}
                    single={true}
                >
                    <div className={styles.card__imgWrapper}>
                        <Image
                            className={styles.card__img}
                            layout="fill"
                            priority={true}
                            quality={90}
                            src={order?.model ? `/img/iphones/${order.model}.png` : `/img/iphones/empty.png`}
                            alt={order?.model}
                        />
                    </div>
                    <ul className={styles.card__list}>
                        <li className={styles.card__item}>
                            <span>Оформлено</span>
                            {new Date(order?.created || 0).toLocaleString()}
                        </li>
                        {order?.operations?.map(operation => {
                            return (
                                <li key={operation.status} className={styles.card__item}>
                                    <span>{operation.status}</span>
                                    {new Date(operation.dateTime).toLocaleString()}
                                </li>
                            )
                        })}
                    </ul>
                    <p className={styles.card__about}>
                        <span>{order?.model} — {order?.component}</span>
                        Вартість: {order?.cost}₴
                    </p>
                    <Link href="/check" passHref>
                        <a className={clsx(styles.card__btn, "btn btn_purple")}>Назад</a>
                    </Link>
                    <Link href="/" passHref>
                        <a className={clsx(styles.card__btn, "btn btn_green")}>На головну</a>
                    </Link>
                </Card>
            </div>
        </section>
    )
}

export default StatusSection;