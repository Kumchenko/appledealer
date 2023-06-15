import { INavPoint } from "@/interfaces";

export interface INavLink  {
    point: INavPoint,
    className?: string,
    styles?: {
        [key: string]: string
    }
}