import { ICallReqData, IOrderReqBody, IOrderReqQuery } from "pages/api/interfaces";

export const orderInitialValues: IOrderReqBody = {
    modelId: '',
    name: '',
    surname: '',
    tel: '',
    email: '',
    componentId: '',
    qualityId: ''
};

export const checkInitialValues: IOrderReqQuery = {
    id: '',
    tel: ''
}

export const callInitialValues: ICallReqData = {
    name: '',
    tel: ''
}