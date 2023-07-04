import { IModalOpenParams, ModalWrapper } from "@/components/ModalWrapper/ModalWrapper";
import { Ref } from "react";

export class Modal {
    static _currentGlobalLoader: ModalWrapper | null = null; //reference variable

    // getting reference of bottom wrapper component
    static registerModal(ref: ModalWrapper | null) {
        if (ref) this._currentGlobalLoader = ref;
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