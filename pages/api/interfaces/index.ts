export interface IOrderReqData {
    model: string;
    name: string;
    surname: string;
    tel: string;
    email: string;
    component: string;
    quality: string;
}

export interface IOrderData extends IOrderReqData {
    serviceId: number;
    cost: number;
}

export interface IServiceReqData {
    model: string;
    component: string;
    quality: string;
}

export interface IServiceResData {
    id: number;
    cost: number;
}

export interface IServiceData extends IServiceReqData, IServiceResData { };

export interface IComponentsReqData {
    model: string;
}

export interface IServicesReqData {
    model: string;
    component: string;
}

