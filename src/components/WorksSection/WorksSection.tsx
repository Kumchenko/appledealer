import clsx from "clsx"
import styles from './sass/Works.module.scss'
import { Navigation, Pagination, Autoplay, A11y } from 'swiper'
import { Swiper } from 'swiper/react'
import { SwiperSlide } from "swiper/react";
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useTranslation } from "@/hooks"
import { useMemo } from "react"
import Slide from "../Slide/Slide"
import WorkSlides from "@/constants/WorkSlides";

const WorksSection = () => {
    const { t: w } = useTranslation('index', { keyPrefix: 'works' });

    const slides = useMemo(() => {
        const slidesTranslation = w('slides', { returnObjects: true, defaultValue: null });
        return WorkSlides?.map((slide, id) => (
            <SwiperSlide key={id} className={styles.slide}>
                <Slide
                    title={slidesTranslation?.[id]?.title}
                    desc={slidesTranslation?.[id]?.desc}
                    {...slide} />
            </SwiperSlide>))
    }, [w]);

    return (
        <section id="works" className={styles.works}>
            <div className={clsx(styles.container, "container")}>
                <h2 className={styles.works__title}>{w('title')}</h2>
                <p className={styles.works__subtitle}>{w('subtitle')}</p>
                <Swiper
                    className={styles.slider}
                    modules={[Navigation, Pagination, Autoplay, A11y]}
                    navigation
                    loop
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                >
                    {slides}
                </Swiper>
            </div>
        </section>
    )
}

export default WorksSection