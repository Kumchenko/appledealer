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
import { useTranslation } from "@/hooks/useTranslation"
import { useMemo } from "react"
import { ISlideProps } from "../Slide/interfaces"
import Slide from "../Slide/Slide"

const WorksSection = () => {
    const { t: w } = useTranslation('index', { keyPrefix: 'works' });

    const slides = useMemo(() => {
        const slidesInfo: ISlideProps[] | null = w('slides', { returnObjects: true, defaultValue: null });
        return slidesInfo?.map((slide, id) => (
            <SwiperSlide key={id} className={styles.slide}>
                <Slide {...slide} />
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