import { IFormSelect } from '@/components/Form/components/FormSelect/interfaces'

export type IFormSelectExtended = {
    label: string
} & Omit<IFormSelect, 'id'>
