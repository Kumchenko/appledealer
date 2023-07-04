import { Component, Model } from "@prisma/client";

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
    loadingStatus: LoadingStatus
}

export enum LoadingStatus {
    Idle = 'idle',
    Fetching = 'fetching',
    Fetched = 'fetched',
    Error = 'error'
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

export interface INavPoint {
    href: string,
    title: string,
    subPoints?: INavPoint[]
}

export interface ISocialPoint {
    href: string,
    child: JSX.Element
}
