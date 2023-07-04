import { Router } from "next/router";

export function scrollToId(router: Router) {
    const selector = router.asPath.replace(router.pathname, '');
    if (selector) {
        document.querySelector(selector)?.scrollIntoView();
    }
}