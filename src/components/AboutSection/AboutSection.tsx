import clsx from 'clsx';
import styles from './sass/About.module.scss';
import { useTranslation } from '@/hooks';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { createTime } from '@/utils';
import CallModal from '../CallModal/CallModal';
import { Modal } from '@/utils';
import Button from '../Button/Button';

const AboutSection = () => {
    const { t } = useTranslation();
    const { t: i } = useTranslation('index');

    const router = useRouter();

    // Memoizing locale
    const locale = useMemo(() => router.locale || router.defaultLocale, [router.defaultLocale, router.locale]);

    // Loading state of Embed GMap
    const [loading, setLoading] = useState(true);

    // Setting time format
    const timeFormat: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }

    // Handle click on CallMe btn
    const handleCallClick = () => {
        Modal.open({
            closeIcon: true,
            title: t('call-back'),
            content: CallModal
        })
    }

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
                        <span>
                            {createTime(10, 0).toLocaleTimeString(locale, timeFormat)}
                            –
                            {createTime(19, 0).toLocaleTimeString(locale, timeFormat)}
                        </span>
                        <span>{i('saturday')}</span>
                        <span>
                            {createTime(10, 0).toLocaleTimeString(locale, timeFormat)}
                            –
                            {createTime(16, 0).toLocaleTimeString(locale, timeFormat)}
                        </span>
                        <span>{i('weekends')}</span>
                        <span>{i('weekend')}</span>
                    </div>
                    <h3 className={styles.info__title}>{i('contacts')}</h3>
                    <a className={styles.info__address} href="https://goo.gl/maps/XLexykR1npzgqB2R7" target="_blank"
                        rel="noopener noreferrer">
                        {t('address')}
                    </a>
                    <div className={styles.info__contacts}>
                        <Button 
                            className={styles.info__call}
                            color='purple'
                            href='tel:+380635005050'
                            target='_self'
                        >
                            +380635005050
                        </Button>
                        <Button
                            onClick={handleCallClick}
                            className={styles.info__callme}
                            color='green'
                        >
                            {t('call-back')}
                        </Button>
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