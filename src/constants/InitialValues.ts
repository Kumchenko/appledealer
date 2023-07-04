import { ICallReqData, IOrderReqBody, IOrderReqQuery } from "pages/api/interfaces";

export const orderInitialValues: IOrderReqBody = {
    model: '',
    name: '',
    surname: '',
    tel: '',
    email: '',
    component: '',
    quality: ''
};

export const checkInitialValues: IOrderReqQuery = {
    id: '',
    tel: ''
}

export const callInitialValues: ICallReqData = {
    name: '',
    tel: ''
}