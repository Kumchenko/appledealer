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