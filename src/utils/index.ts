import { Router } from 'next/router';

export { Modal } from './Modal'
export { fetchJSON } from './fetchJSON'

export function idToString(id: number): string {
    const res = id.toString().split('');
    const length = res.length
    for (let i = 0; i < (4 - length); i++) {
        res.unshift('0');
    }
    return res.join('');
}

export function idToNumber(id: string): number {
    const res = id.split('');
    for (let i = 0; i < id.length; i++) {
        if (res[0] === '0') {
            res.shift();
        }
    }
    return parseInt(res.join(''), 10);
}

export function createTime(hours: number, minutes: number): Date {
    const dateHours = new Date(0).setHours(hours);
    const dateMinutes = new Date(dateHours).setMinutes(minutes);
    return new Date(dateMinutes);
}

export function scrollToId(router: Router) {
    const selector = router.asPath.replace(router.pathname, '');
    if (selector) {
        document.querySelector(selector)?.scrollIntoView();
    }
}