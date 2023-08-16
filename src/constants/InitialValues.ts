import { ICallPostReq, IOrderGetReq, IOrderPostReq } from '@/interfaces'

export const orderInitialValues: IOrderPostReq = {
    modelId: '',
    name: '',
    surname: '',
    tel: '',
    email: '',
    componentId: '',
    qualityId: '',
}

export const checkInitialValues: IOrderGetReq = {
    id: '',
    tel: '',
}

export const callInitialValues: ICallPostReq = {
    name: '',
    tel: '',
}
