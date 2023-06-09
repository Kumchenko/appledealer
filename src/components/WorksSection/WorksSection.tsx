import Image from "next/image"
import clsx from "clsx"
import styles from './sass/Works.module.scss'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useTranslation } from "next-i18next"
import { useMemo } from "react"

interface Slide {
    title: string,
    desc: string,
    src: string,
    href: string
}

const WorksSection = () => {
    const { t } = useTranslation();
    const { t: i } = useTranslation('index');

    const slides: Slide[] = useMemo(() => {
        return i('works.slides', { returnObjects: true })
    }, [i]);

    return (
        <section id="works" className={styles.works}>
            <div className={clsx(styles.container, "container")}>
                <h2 className={styles.works__title}>{i('works.title')}</h2>
                <p className={styles.works__subtitle}>{i('works.subtitle')}</p>
                <Swiper
                    className={styles.slider}
                    modules={[Navigation, Pagination, Autoplay, A11y]}
                    navigation
                    loop
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                >
                    {
                        slides.map(slide => (
                            <SwiperSlide key={slide.title} className={styles.slide}>
                                <div className={styles.slide__info}>
                                    <h4 className={styles.slide__title}>{slide.title}</h4>
                                    <p className={styles.slide__desc}>
                                        {slide.desc}
                                    </p>
                                    <a
                                        className={clsx(styles.slide__more, "btn btn_purple")}
                                        href={slide.href}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        {t('view')}
                                    </a>
                                </div>
                                <div className={styles['slide__img-wrapper']}>
                                    <Image className={styles.slide__img} layout="fill" src={slide.src} alt={slide.title} />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default WorksSection