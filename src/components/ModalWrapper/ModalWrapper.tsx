import { Component } from 'react'
import ModalView, { IModalProps } from '../ModalView/ModalView'
import styles from './sass/ModalWrapper.module.scss'
import clsx from 'clsx'

export type IModalOpenParams = {
    id?: number
} & IModalProps

interface IState {
    isWrapperVisible: boolean
    modals: IModalOpenParams[]
}

export class ModalWrapper extends Component<{}, IState> {
    state: IState = {
        isWrapperVisible: false,
        modals: [],
    }

    modalCounter = 0

    open = ({ ...args }: IModalOpenParams) => {
        let modals = this.state.modals.slice()

        const modal = { ...args }
        modal.id = this.modalCounter++

        // Firstly adding modal to the state
        this.setState(state => ({
            modals: [...state.modals, modal],
        }))

        // Secondly changing Visibility for retain open effect
        setTimeout(() => {
            this.setState(state => ({
                modals: state.modals.map(m => {
                    if (m.id === modal.id) {
                        m.isVisible = true
                    }
                    return m
                }),
                isWrapperVisible: true,
            }))
        })
    }

    close = (index?: number) => {
        let modals = this.state.modals.slice()
        index = index ? index : modals[0].id

        // Firstly setting visible false for retain close effect
        this.setState(state => ({
            modals: state.modals.map(modal => {
                if (modal.id === index) {
                    modal.isVisible = false
                }
                return modal
            }),
            isWrapperVisible: modals.length > 1,
        }))

        // Secondly deleting modal from state
        setTimeout(() => {
            this.setState(state => ({
                modals: state.modals.filter(modal => modal.id !== index),
            }))
        }, 400)
    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<IState>, snapshot?: any): void {
        if (prevState.isWrapperVisible !== this.state.isWrapperVisible) {
            if (this.state.isWrapperVisible) {
                document.documentElement.classList.add('lock')
            } else {
                document.documentElement.classList.remove('lock')
            }
        }
    }

    render() {
        const { modals, isWrapperVisible } = this.state
        return (
            <div
                onClick={e => {
                    e.target === e.currentTarget && this.close()
                }}
                onKeyDown={e => e.key === 'Escape' && this.close()}
                className={clsx(styles.modalWrapper, isWrapperVisible && styles.opened)}
            >
                {modals.map(({ closeModal, title, id, ...modal }: IModalOpenParams) => (
                    <ModalView key={id} closeModal={() => this.close(id)} title={title} {...modal} />
                ))}
            </div>
        )
    }
}
