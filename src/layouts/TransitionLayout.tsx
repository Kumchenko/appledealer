import { scrollToId } from '@/utils'
import { useNextCssRemovalPrevention } from '@madeinhaus/nextjs-page-transition'
import { a, useTransition } from '@react-spring/web'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

interface ITransitionLayout {
    children: ReactElement
}

const TransitionLayout = ({ children }: ITransitionLayout) => {
    const router = useRouter()
    const [pagesArr, setPagesArr] = useState([children])

    // Fix CSS dissappearing when transition (Unofficial fix)
    useNextCssRemovalPrevention()

    const transitions = useTransition(pagesArr, {
        from: { opacity: 0, x: '100%' },
        enter: { opacity: 1, x: '0px' },
        leave: { opacity: 0, x: '-50%', position: 'absolute' },
        onRest: () => {
            scrollToId(router)
        },
    })

    useEffect(() => {
        setPagesArr([children])
    }, [children])

    return transitions((style, item) => <a.div style={style}>{item}</a.div>)
}

export default TransitionLayout
