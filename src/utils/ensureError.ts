import { IApiError } from "@/interfaces";
import { instanceOfAE } from "./instanceOf";

export const ensureError = (err: any): IApiError => {
    if (instanceOfAE(err)) {
        return err;
    }
    if (err instanceof Error) {
        return {
            name: err.name,
            i18n: 'occured', 
            message: err.message, 
            stack: err.stack 
        }
    }

    const e = new Error(typeof err === 'string' ? err : 'Unserialized error');
    return {
        name: e.name,
        i18n: 'occured', 
        message: e.message, 
        stack: e.stack 
    }
}