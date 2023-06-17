import { Component } from "react";
import ModalView, { IModalProps } from "../Modal/Modal";
import styles from "./sass/ModalWrapper.module.scss";
import clsx from "clsx";

export type IModalOpenParams = {
    id?: number;
} & IModalProps

interface IState {
    isWrapperVisible: boolean
    modals: IModalOpenParams[]
}

export class ModalWrapper extends Component<{}, IState> {
    state: IState = {
        isWrapperVisible: false,
        modals: []
    }

    modalCounter = 0;

    open = ({ ...args }: IModalOpenParams) => {
        let modals = this.state.modals;

        const modal = { ...args };
        modal.id = this.modalCounter++;

        // Firstly adding modal to the state
        const addedModalId = modals.push(modal) - 1;
        this.setState({ modals });

        // Secondly changing Visibility for retain open effect
        setTimeout(() => {
            modals[addedModalId].isVisible = true;
            this.setState({ modals, isWrapperVisible: true });
        });
    }

    close = (index = 0) => {
        let modals = this.state.modals;

        // Firstly setting visible false for retain close effect
        if (modals[index]) {
            modals[index].isVisible = false;
            this.setState({ modals, isWrapperVisible: modals.length - 1 > 0 });
        }

        // Secondly deleting modal from state
        setTimeout(() => {
            modals.splice(index, 1);
            this.setState({ modals })
        }, 1000);
    }

    render() {
        const { modals, isWrapperVisible } = this.state;
        if (modals.length > 0) {
            return (
                <div 
                    onClick={e => { e.target === e.currentTarget && this.close() }} 
                    onKeyDown={e => e.key === 'Escape' && this.close()} 
                    className={clsx(styles.modalWrapper, isWrapperVisible && styles.opened)}
                >
                    {modals.map(({ closeModal, ...modal }: IModalOpenParams, index: number) => (
                        <ModalView
                            key={modal.id + "" + index}
                            closeModal={() => this.close(index)}
                            {...modal}
                        />
                    ))}
                </div>
            )
        }
        return null
    }
}