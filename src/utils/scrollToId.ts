import { NextRouter } from 'next/router'

export function scrollToId(router: NextRouter) {
    const selector = router.asPath.replace(router.pathname, '')
    if (selector) {
        document.querySelector(selector)?.scrollIntoView()
    }
}
