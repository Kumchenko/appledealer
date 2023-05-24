import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";


function Transition({ children, ...rest }: HTMLMotionProps<'div'>, ref: React.ForwardedRef<HTMLDivElement>) {
    const points = {
        from: { backgroundColor: '#fff', opacity: 0, x: '100%' },
        enter: { backgroundColor: '#fff', opacity: 1, x: '0px' },
        leave: { backgroundColor: '#000', opacity: 1, x: '-50%' }
    };

    return (
        <motion.div
            ref={ref}
            initial={points.from}
            animate={points.enter}
            exit={points.leave}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            {...rest}
        >
            {children}
        </motion.div >
    )
}

export default forwardRef(Transition)