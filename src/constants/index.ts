import { IApiError } from '@/interfaces'
import NavPoints from './NavPoints'
import SocialPoints from './SocialPoints'
import WorkSlides from './WorkSlides'

const _apiBase = process.env.NEXT_PUBLIC_API_URL

export const apiError: IApiError = {
    name: 'ApiError',
    i18n: '',
    message: '',
}

export { NavPoints, SocialPoints, WorkSlides, _apiBase }

export { callInitialValues, checkInitialValues, orderInitialValues } from './InitialValues'

export { LoadingStatus, ModalType } from './Enums'
