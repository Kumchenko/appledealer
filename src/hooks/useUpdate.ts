import { useEffect, useRef } from 'react'

const useUpdate = (fn: () => void, deps: Array<any>) => {
    const mounted = useRef(false)
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true
        } else {
            fn()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
}

export default useUpdate
