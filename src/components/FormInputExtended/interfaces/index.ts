import { IFormInput } from '@/components/FormInput/interfaces'

export type IFormInputExtended = {
    label: string
} & Omit<IFormInput, 'id'>
