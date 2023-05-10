import { useRouter } from 'next/router'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import styles from './transitionLayout.module.scss'

const TransitionLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    return (
        <SwitchTransition mode='out-in'>
            <CSSTransition
                appear
                key={router.pathname}
                timeout={300}
                classNames={{
                    appear: styles['page-appear'],
                    appearActive: styles['page-appear-active'],
                    enter: styles['page-enter'],
                    enterActive: styles['page-enter-active'],
                    exit: styles['page-exit'],
                    exitActive: styles['page-exit-active']
                }}
            >
                {children}
            </CSSTransition>
        </SwitchTransition>
    )
}

export default TransitionLayout;