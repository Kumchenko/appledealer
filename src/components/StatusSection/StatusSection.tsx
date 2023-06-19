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
import { useTranslation } from "@/hooks";

const StatusSection = () => {
    const { t } = useTranslation();
    const { t: s } = useTranslation('status');
    const { t: r } = useTranslation('repair');

    const router = useRouter();
    const { order, loadingStatus } = useSelector(({ orderSlice }) => orderSlice);
    const id = useMemo(() => idToString(order?.id ? order.id : 0), [order?.id]);

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
                <title>{`${r('order')} ${id} – AppleDealer`}</title>
            </Head>
            <div className={clsx(styles.container, "container")}>
                <h1 className={styles.result__title}>
                    {s('h1')}
                </h1>
                <Card
                    className={styles.card}
                    titleClass={styles.card__title}
                    title={`${r('order')} ${id}`}
                    single={true}
                >
                    <div className={styles.card__imgWrapper}>
                        <Image
                            className={styles.card__img}
                            layout="fill"
                            priority={true}
                            quality={90}
                            src={order?.model ? `/img/iphones/${order.model}.png` : `/img/iphones/empty.png`}
                            alt={r(order?.model)}
                        />
                    </div>
                    <ul className={styles.card__list}>
                        <li className={styles.card__item}>
                            <span>{r('CREATED')}</span>
                            {new Date(order?.created || 0).toLocaleString(router.locale)}
                        </li>
                        {order?.operations?.map(operation => {
                            return (
                                <li key={operation.status} className={styles.card__item}>
                                    <span>{r(operation.status)}</span>
                                    {new Date(operation.dateTime).toLocaleString(router.locale)}
                                </li>
                            )
                        })}
                    </ul>
                    <p className={styles.card__about}>
                        <span>{r(order?.model)} — {r(order?.component)}</span>
                        {t('cost')}: {order?.cost}₴
                    </p>
                    <Link href="/check" legacyBehavior>
                        <a className={clsx(styles.card__btn, "btn btn_purple")}>{t('back')}</a>
                    </Link>
                    <Link href="/" legacyBehavior>
                        <a className={clsx(styles.card__btn, "btn btn_green")}>{t('to-main')}</a>
                    </Link>
                </Card>
            </div>
        </section>
    )
}

export default StatusSection;