export interface IOrderReqQuery {
    [key: string]: string | string[]
    id: string;
    tel: string;
}

export interface IOrderReqBody {
    modelId: string;
    name: string;
    surname: string;
    tel: string;
    email: string;
    componentId: string;
    qualityId: string;
}

export interface IOrderData extends IOrderReqBody {
    id: number;
    serviceId: number;
    created: Date;
    cost: number;
    operations?: {
        id: number
        dateTime: Date
        status: string
        orderId: number
        employeeId: number
    }[]
}

export interface IServiceReqData {
    modelId: string;
    componentId: string;
    qualityId: string;
}

export interface IServiceResData {
    id: number;
    cost: number;
}

export interface IServiceData extends IServiceReqData, IServiceResData { };

export interface IComponentsReqData {
    modelId: string;
}

export interface IServicesReqData {
    modelId: string;
    componentId: string;
}

export interface ICallReqData {
    name: string;
    tel: string;
}

