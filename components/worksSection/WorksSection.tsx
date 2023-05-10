import Image from "next/image"

import clsx from "clsx"
import styles from './works.module.scss'

import { Navigation, Pagination, Autoplay, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/a11y'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const WorksSection = () => {
    return (
        <section id="works" className={styles.works}>
            <div className={clsx(styles.container, "container")}>
                <h2 className={styles.works__title}>Наше кредо - якість!</h2>
                <p className={styles.works__subtitle}>Нижче наведено приклад наших робіт</p>
                <Swiper
                    className={styles.slider}
                    modules={[Navigation, Pagination, Autoplay, A11y]}
                    navigation
                    loop
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                >
                    <SwiperSlide className={styles.slide}>
                        <div className={styles.slide__info}>
                            <h4 className={styles.slide__title}>Заміна заднього скла</h4>
                            <p className={styles.slide__desc}>
                                Заміна заднього скла зі збереженням оригінальної рамки корпусу та зарядки MagSafe.
                            </p>
                            <a className={clsx(styles.slide__more, "btn btn_purple")} href="#" target="_blank" rel="noopener noreferrer">Переглянути</a>
                        </div>
                        <div className={styles['slide__img-wrapper']}>
                            <Image className={styles.slide__img} layout="fill" src="/img/changing-glass.png" alt="Changing back glass on iPhone" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.slide}>
                        <div className={styles.slide__info}>
                            <h4 className={styles.slide__title}>Заміна дисплею</h4>
                            <p className={styles.slide__desc}>
                                Заміна дисплею зі збереженням функцій Авто-яскравості та True Tone.
                            </p>
                            <a className={clsx(styles.slide__more, "btn btn_purple")} href="#" target="_blank" rel="noopener noreferrer">Переглянути</a>
                        </div>
                        <div className={styles['slide__img-wrapper']}>
                            <Image className={styles.slide__img} layout="fill" src="/img/changing-display.jpg" alt="Changing display on iPhone" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className={styles.slide}>
                        <div className={styles.slide__info}>
                            <h4 className={styles.slide__title}>Заміна акумуляторної батареї</h4>
                            <p className={styles.slide__desc}>
                                Заміна АКБ зі збереженням відображення % стану в налаштуваннях.
                            </p>
                            <a className={clsx(styles.slide__more, "btn btn_purple")} href="#" target="_blank" rel="noopener noreferrer">Переглянути</a>
                        </div>
                        <div className={styles['slide__img-wrapper']}>
                            <Image className={styles.slide__img} layout="fill" src="/img/changing-battery.jpg" alt="Changing battery on iPhone" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
}

export default WorksSection