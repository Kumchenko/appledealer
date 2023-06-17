import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import styles from "./sass/Modal.module.scss"
import clsx from "clsx"
import { useEffect, useRef } from "react"
import { ICardProps } from "../Card/interfaces"
import Card from "../Card/Card"

export type IModalProps = {
    content?: React.FC<any>;
    closeIcon?: boolean,
    closeModal?: Function,
    autoClose?: number,
    isVisible?: boolean
} & ICardProps;

const ModalView = ({ closeIcon, closeModal, autoClose, isVisible, content: Content, className, ...args }: IModalProps) => {
    // Set autoclosing
    useEffect(() => {
        if (autoClose && closeModal && autoClose > 1000) {
            setTimeout(() => {
                closeModal()
            }, autoClose)
        }
    }, [autoClose, closeModal])

    return (
        <Card className={clsx(styles.modal, className)} single={true} titleClass={clsx(!Content && styles.title_only)} {...args}>
            {closeIcon ? <button onClick={() => closeModal ? closeModal() : null} className={styles.modal__close}>
                <FontAwesomeIcon icon={faXmark} />
            </button> : null}
            {Content && <Content closeModal={closeModal} />}
        </Card>
    )
}

export default ModalView