import { ICallPostReq, IOrderGetReq, IOrderPostReq } from '@/interfaces'

export const orderInitialValues: IOrderPostReq = {
    modelId: '',
    name: '',
    surname: '',
    tel: '',
    email: '',
    componentId: '',
    qualityId: '',
    captchaToken: null,
}

export const checkInitialValues: IOrderGetReq = {
    id: '',
    tel: '',
    captchaToken: null,
}

export const callInitialValues: ICallPostReq = {
    name: '',
    tel: '',
    captchaToken: null,
}
