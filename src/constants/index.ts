import { IApiError } from '@/interfaces'
import NavPoints from './NavPoints'
import SocialPoints from './SocialPoints'
import WorkSlides from './WorkSlides'
import { env } from './env'

export const apiError: IApiError = {
    name: 'ApiError',
    i18n: '',
    message: '',
}

export { NavPoints, SocialPoints, WorkSlides }

export { callInitialValues, checkInitialValues, orderInitialValues } from './InitialValues'

export { LoadingStatus, ModalType } from './Enums'
