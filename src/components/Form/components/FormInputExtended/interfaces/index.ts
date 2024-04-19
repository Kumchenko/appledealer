import { IFormInput } from '@/components/Form/components/FormInput/interfaces'

export type IFormInputExtended = {
    label: string
} & Omit<IFormInput, 'id'>
