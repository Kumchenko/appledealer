import clsx from 'clsx';
import styles from './sass/About.module.scss';
import { useTranslation } from '@/hooks/useTranslation';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { PulseLoader } from 'react-spinners';

const AboutSection = () => {
    const { t } = useTranslation();
    const { t: i } = useTranslation('index');

    const router = useRouter();
    const locale = useMemo(() => router.locale || router.defaultLocale, [router.defaultLocale, router.locale]);

    const [loading, setLoading] = useState(true);

    return (
        <section id="about" className={styles.about}>
            <div className={clsx(styles.container, styles.grid, "container grid")}>
                <h1 className={styles.about__title}>
                    {i('h1')}
                </h1>
                <p className={styles.about__subtitle}>
                    {i('subtitle')}
                </p>
                <address className={styles.info}>
                    <h3 className={styles.info__title}>{i('open-hours')}</h3>
                    <div className={styles.timetable}>
                        <span>{i('weekdays')}</span>
                        <span>10:00 - 19:00</span>
                        <span>{i('saturday')}</span>
                        <span>10:00 - 16:00</span>
                        <span>{i('weekends')}</span>
                        <span>{i('weekend')}</span>
                    </div>
                    <h3 className={styles.info__title}>{i('contacts')}</h3>
                    <a className={styles.info__address} href="https://goo.gl/maps/XLexykR1npzgqB2R7" target="_blank"
                        rel="noopener noreferrer">
                        {t('address')}
                    </a>
                    <div className={styles.info__contacts}>
                        <a className="info__call btn btn_purple" href="tel:+380635005050">+380635005050</a>
                        <button className="info__callme btn btn_green">{t('call-back')}</button>
                    </div>
                </address>
                <div className={styles.about__mapWrapper}>
                    <PulseLoader
                        color={styles.purple}
                        className={styles.about__loader}
                        loading={loading}
                        aria-label="Loading pulseloader"
                    />
                    <iframe
                        className={styles.about__map}
                        loading="lazy"
                        onLoad={() => setLoading(false)}
                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}
                             &q=улица+Якова+Самарского,+7,+Днепр,+Днепропетровская+область,+Украина&language=${locale}`}
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                    />
                </div>
            </div>
        </section>
    )
}

export default AboutSection