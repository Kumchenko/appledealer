import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import styles from './sass/Modal.module.scss'
import clsx from 'clsx'
import { useEffect } from 'react'
import { ICardProps } from '../Card/interfaces'
import Card from '../Card/Card'
import { ModalType } from '@/constants'
import { useTranslation } from '@/hooks'

export type IModalProps = {
    content?: React.ComponentType<any>
    closeIcon?: boolean
    closeModal?: Function
    autoClose?: number
    isVisible?: boolean
    type?: ModalType
} & ICardProps

const ModalView = ({
    title,
    closeIcon,
    closeModal,
    autoClose,
    content: Content,
    className,
    titleClass,
    type = ModalType.Normal,
    isVisible,
}: IModalProps) => {
    const { t } = useTranslation()
    // Set autoclosing
    useEffect(() => {
        if (autoClose && closeModal && autoClose > 1000) {
            setTimeout(() => {
                closeModal()
            }, autoClose)
        }
    }, [autoClose, closeModal])

    return (
        <Card
            className={clsx(styles.modal, className, isVisible && styles.visible)}
            single={true}
            titleClass={clsx(titleClass, type === ModalType.Error && styles.title_error, !Content && styles.title_only)}
            title={type === ModalType.Error ? t(`errors.${title}`) : title}
        >
            {closeIcon ? (
                <button onClick={() => (closeModal ? closeModal() : null)} className={styles.modal__close}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            ) : null}
            {Content && <Content closeModal={closeModal} />}
        </Card>
    )
}

export default ModalView
