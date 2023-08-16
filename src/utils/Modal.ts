import { IModalOpenParams, ModalWrapper } from '@/components/ModalWrapper/ModalWrapper'
import { ModalType } from '@/constants'

export class Modal {
    static _currentGlobalLoader: ModalWrapper | null = null //reference variable

    // getting reference of bottom wrapper component
    static registerModal(ref: ModalWrapper | null) {
        if (ref) this._currentGlobalLoader = ref
    }

    static open({ ...args }: IModalOpenParams) {
        if (this._currentGlobalLoader instanceof ModalWrapper) {
            this._currentGlobalLoader.open({ ...args })
        }
    }

    // Display i18n Error type Modal: t('errors.i18n_key')
    static error(i18n_key: string) {
        if (this._currentGlobalLoader instanceof ModalWrapper) {
            this._currentGlobalLoader.open({
                type: ModalType.Error,
                title: i18n_key || 'occured',
            })
        }
    }

    static close(index?: number) {
        if (this._currentGlobalLoader instanceof ModalWrapper) {
            this._currentGlobalLoader.close(index)
        }
    }
}
