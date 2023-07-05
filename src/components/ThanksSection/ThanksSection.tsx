import Image from 'next/image';
import clsx from 'clsx';
import styles from './sass/Thanks.module.scss'
import Card from '../Card/Card';
import { useSelector } from '@/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { idToString } from '@/utils';
import { useTranslation } from '@/hooks';
import Button from '../Button/Button';

const ThanksSection = () => {
    const { t } = useTranslation();

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
                    {t('thanks:h1')}
                </h1>
                <Card title={`${t('repair:order')} ${order?.id ? idToString(order.id) : 0}`} className={styles.card} single={true}>
                    <p className={styles.card__subtitle}>
                        {t('thanks:will-contact')}
                    </p>
                    <Image
                        className={styles.card__img}
                        width={320}
                        height={260}
                        quality={90}
                        priority={true}
                        src={order?.modelId ? `/img/iphones/${order.modelId}.jpg` : `/img/iphones/empty.jpg`}
                        alt={order?.modelId}
                    />
                    <p className={styles.card__about}>
                        <span>{t(`repair:${order?.modelId}`)} — {t(`repair:${order?.componentId}`)}</span>
                        {t('cost')}: {order?.cost}₴
                    </p>
                    <Button 
                        href="/"
                        className={styles.card__btn}
                        color="green"
                    >
                        {t('to-main')}
                    </Button>
                </Card>
            </div>
        </section>
    )
}

export default ThanksSection;