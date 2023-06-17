import { IModalOpenParams } from "@/components/ModalWrapper/ModalWrapper";

export class Modal {
    _currentGlobalLoader = null; //reference variable

    // getting reference of bottom wrapper component
    static registerModal(ref: React.Ref<any>) {
        (this as any)._currentGlobalLoader = ref;
    }

    static open({ ...args }: IModalOpenParams) {
        if ((this as any)._currentGlobalLoader) {
            ((this as any)._currentGlobalLoader as any).open({ ...args });
        }
    }

    static close(index?: number) {
        if ((this as any)._currentGlobalLoader) {
            ((this as any)._currentGlobalLoader as any).close(index);
        }
    }
}