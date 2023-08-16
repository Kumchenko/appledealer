import { IApiError } from '@/interfaces'
import { Modal } from '@/utils'
import { Action, Middleware } from '@reduxjs/toolkit'

interface RejectedAction extends Action {
    payload: IApiError
    meta: {
        rejectedWithValue: boolean
    }
}

const errorMiddleware: Middleware = store => next => (action: RejectedAction) => {
    const i18nOfError = action.payload?.i18n
    if (action.meta?.rejectedWithValue && i18nOfError) {
        Modal.error(i18nOfError)
    }
    return next(action)
}

export { errorMiddleware }
