import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export interface IModels {
    modelIds: string[];
}

export interface IComponents {
    components: string[];
}

export interface IService {
    id: number;
    modelId: string;
    componentId: string;
    qualityId: string;
    cost: number;
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
