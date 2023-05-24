import { useState, useEffect, useRef } from 'react'
import useCountdown from '@/hooks/useCountdown'
import usePrevious from '@/hooks/usePrevious'
import styles from './sass/Timer.module.scss'
import { ITimer, ITimerBlock } from './interfaces'
import { PulseLoader } from 'react-spinners'
import clsx from 'clsx'


const TimerBlock = ({ value, name }: ITimerBlock) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const prevValue = usePrevious(value);

    useEffect(() => {
        trackRef.current?.classList.remove(styles.animActive);

        const node = document.createElement("span");
        node.classList.add(styles.timer__count);
        node.innerText = `${prevValue}`;

        trackRef.current?.prepend(node);
        trackRef.current?.classList.add(styles.anim);

        setTimeout(() => {
            trackRef.current?.firstElementChild?.remove();
            trackRef.current?.classList.add(styles.animActive);
        }, 500);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <div className={styles.timer__block}>
            <div className={styles.timer__field}>
                <div ref={trackRef} className={styles.timer__track}>
                    <span className={styles.timer__count}>{value}</span>
                </div>
            </div>
            <span className={styles.timer__label}>{name}</span>
        </div>
    )
}


const Timer = ({ date }: ITimer) => {
    const { completed, ticking, units: { days, hours, minutes, seconds } } = useCountdown(date);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    const View = (<div className={clsx(styles.timer, styles.timerLocation)}>
        <TimerBlock name="Дні" value={days} />
        <TimerBlock name="Години" value={hours} />
        <TimerBlock name="Хвилини" value={minutes} />
        <TimerBlock name="Секунди" value={seconds} />
    </div>);

    const Load = <PulseLoader
        cssOverride={{display: 'block'}}
        color={styles.purple}
        className={clsx(styles.loader, styles.timerLocation)} 
        loading={loading} 
        aria-label="Loading pulseloader" />

    const Complete = <p className={clsx(styles.completed, styles.timerLocation)}>Пропозиція скінчилась :(</p>

    if (loading) return Load;
    if (ticking) return View;
    return Complete;
}

export default Timer;