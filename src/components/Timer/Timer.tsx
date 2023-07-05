import { useState, useEffect, useRef } from 'react'
import { useCountdown } from '@/hooks'
import styles from './sass/Timer.module.scss'
import { ITimer, ITimerBlock } from './interfaces'
import { PulseLoader } from 'react-spinners'
import clsx from 'clsx'
import { useTranslation } from '@/hooks'
import { a, useTransition } from '@react-spring/web'


const TimerBlock = ({ value, name }: ITimerBlock) => {
    const [values, setValues] = useState([value]);

    const transitions = useTransition(values, {
        from: { y: '100%' },
        enter: { y: '0px' },
        leave: { y: '-100%', position: 'absolute' }
    })

    useEffect(() => {
        setValues([value])
    }, [value])

    return (
        <div className={styles.timer__block}>
            <div className={styles.timer__field}>
                {transitions((style, item) => <a.span className={styles.timer__count} style={style}>{item}</a.span>)}
            </div>
            <span className={styles.timer__label}>{name}</span>
        </div>
    )
}


const Timer = ({ date, ended }: ITimer) => {
    const { t } = useTranslation('timer');
    const { completed, ticking, units: { days, hours, minutes, seconds } } = useCountdown(date);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    const View = (<div className={clsx(styles.timer, styles.timerLocation)}>
        <TimerBlock name={t('day', { count: days })} value={days} />
        <TimerBlock name={t('hour', { count: hours })} value={hours} />
        <TimerBlock name={t('minute', { count: minutes })} value={minutes} />
        <TimerBlock name={t('second', { count: seconds })} value={seconds} />
    </div>);

    const Load = <PulseLoader
        cssOverride={{ display: 'flex' }}
        color={styles.purple}
        className={clsx(styles.loader, styles.timerLocation)}
        loading={true}
        aria-label="Loading pulseloader" />

    const Complete = <p className={clsx(styles.completed, styles.timerLocation)}>{ended}</p>

    if (loading) return Load;
    if (ticking) return View;
    return Complete;
}

export default Timer;