import { IModalOpenParams, ModalWrapper } from "@/components/ModalWrapper/ModalWrapper";
import { Ref } from "react";

export class Modal {
    static _currentGlobalLoader: Ref<ModalWrapper> = null; //reference variable

    // getting reference of bottom wrapper component
    static registerModal(ref: Ref<ModalWrapper>) {
        this._currentGlobalLoader = ref;
    }

    static open({ ...args }: IModalOpenParams) {
        if (this._currentGlobalLoader instanceof ModalWrapper) {
            this._currentGlobalLoader.open({ ...args });
        }
    }

    static close(index?: number) {
        if (this._currentGlobalLoader instanceof ModalWrapper) {
            this._currentGlobalLoader.close(index);
        }
    }
}