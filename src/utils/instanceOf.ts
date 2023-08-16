import { apiError } from '@/constants'
import { IApiError } from '@/interfaces'

// Is obj2 instance of obj1 type
export const instanceOf = <Obj extends object>(obj1: Obj, obj2: any): obj2 is Obj =>
    Object.keys(obj1).every(key => Object.hasOwn(obj2, key))

// Is obj instance of ApiError obj
export const instanceOfAE = (obj: any): obj is IApiError => instanceOf(apiError, obj)
