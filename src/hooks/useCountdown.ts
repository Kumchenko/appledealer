import { IGetValues, IUseCountdown } from '@/interfaces';
import { useEffect, useState } from 'react';


// All time units in milliseconds
const _oneDay = 1000 * 60 * 60 * 24;
const _oneHour = 1000 * 60 * 60;
const _oneMinute = 1000 * 60;
const _oneSecond = 1000;


const useCountdown = (targetDate: number): IUseCountdown => {
    const countDownDate = new Date(targetDate).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime()
    );

    const [completed, setCompleted] = useState(false);
    const [ticking, setTicking] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = countDownDate - new Date().getTime();
            if (diff <= 0) {
                clearInterval(interval);
                setTicking(false);
                setCompleted(true);
            } else {
                setCountDown(diff);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    return { completed, ticking, units: getValues(countDown) };
};

const getValues = (countDown: number): IGetValues => {
    // calculate time left
    const days = Math.floor(countDown / _oneDay);
    const hours = Math.floor((countDown % _oneDay) / _oneHour);
    const minutes = Math.floor((countDown % _oneHour) / _oneMinute);
    const seconds = Math.floor((countDown % _oneMinute) / _oneSecond);

    return { days, hours, minutes, seconds }
};

export default useCountdown;