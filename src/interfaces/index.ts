import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { LoadingStatus } from '@/constants/Enums'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

export type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export interface IModels {
    modelIds: string[]
}

export interface IService {
    id: number
    modelId: string
    componentId: string
    qualityId: string
    cost: number
}

export interface IServices {
    services: IService[]
}

export interface ILoadingStatus {
    loadingStatus: LoadingStatus
}

export interface IUseCountdown {
    completed: boolean
    ticking: boolean
    units: IGetValues
}

export interface IGetValues {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export interface INavPoint {
    href: string
    title: string
    subPoints?: INavPoint[]
}

export interface ISocialPoint {
    href: string
    child: JSX.Element
}

export interface IOrderGetReq {
    id: string
    tel: string
}

export interface IOrderPostReq {
    modelId: string
    name: string
    surname: string
    tel: string
    email: string
    componentId: string
    qualityId: string
}

export interface IOrder {
    id: number
    serviceId: number
    created: Date
    cost: number
    name: string
    surname: string
    tel: string
    email: string
    service: {
        id: number
        cost: number
        modelId: string
        componentId: string
        qualityId: string
    }
    operations: {
        id: number
        dateTime: Date
        status: string
        orderId: number
        employeeId: number
    }[]
}

export interface ICallPostReq {
    name: string
    tel: string
}

export interface IServicesFetchReq {
    modelId: string
    componentId: string
}

export interface IApiError extends Error {
    i18n: string
    message: string
}
