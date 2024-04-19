import { ModalType } from '@/constants'
import { env } from '@/constants/env'
import { IApiError } from '@/interfaces'
import { Modal } from '@/utils'
import axios, { AxiosError } from 'axios'
import Router from 'next/router'

const call = axios.create({
    baseURL: `${env.api}/api`,
    timeout: 1000 * 60,
    withCredentials: true,
})

call.interceptors.request.use(async request => {
    if (typeof window !== 'undefined') {
        request.headers['Accept-Language'] = Router.locale
    }
    return request
})

call.interceptors.response.use(
    res => res,
    (error: AxiosError<IApiError>) => {
        const title = error.response?.data.message
        if (typeof window !== 'undefined' && title) {
            console.error(title)
            Modal.open({
                autoClose: 3000,
                type: ModalType.Error,
                title,
            })
        }
        return Promise.reject(error)
    },
)

export default call
