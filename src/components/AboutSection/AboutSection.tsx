import clsx from 'clsx';
import styles from './sass/About.module.scss';
import { useTranslation } from '@/hooks/useTranslation';

const AboutSection = () => {
    const { t } = useTranslation();
    const { t: i } = useTranslation('index');
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
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2645.6194919617487!2d35.055122499999996!3d48.4638299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dbe2dcada7f147%3A0x46b3cf12714afd76!2z0LLRg9C70LjRhtGPINCv0LrQvtCy0LAg0KHQsNC80LDRgNGB0YzQutC-0LPQviwgNywg0JTQvdGW0L_RgNC-LCDQlNC90ZbQv9GA0L7Qv9C10YLRgNC-0LLRgdGM0LrQsCDQvtCx0LvQsNGB0YLRjCwgNDkwMDA!5e0!3m2!1suk!2sua!4v1682890630058!5m2!1suk!2sua"
                    className={styles.about__map}
                    loading="eager"
                    referrerPolicy="no-referrer-when-downgrade" />
            </div>
        </section>
    )
}

export default AboutSection