import { Component, Model, Service } from "@prisma/client";

export interface IModels {
    models: Model[];
}

export interface IComponents {
    components: Component[];
}

export interface IService {
    id: number;
    cost: number;
    quality: {
        id: string;
        name: string;
    }
}

export interface IServices {
    services: IService[];
}

export interface ILoadingStatus {
    loadingStatus: 'idle' | 'fetching' | 'fetched' | 'error'
}

export interface IUseCountdown {
    completed: boolean,
    ticking: boolean,
    units: IGetValues
}

export interface IGetValues {
    days: number,
    hours: number,
    minutes: number,
    seconds: number
}