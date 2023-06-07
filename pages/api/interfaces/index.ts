import { Operation } from "@prisma/client";

export interface IOrderReqQuery {
    [key: string]: string | string[]
    id: string;
    tel: string;
}

export interface IOrderReqBody {
    model: string;
    name: string;
    surname: string;
    tel: string;
    email: string;
    component: string;
    quality: string;
}

export interface IOrderResData extends IOrderReqBody {
    id: number;
    serviceId: number;
    created: Date;
    cost: number;
    operations: Operation[] | null
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

