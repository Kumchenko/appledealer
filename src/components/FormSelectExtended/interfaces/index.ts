import { IFormSelect } from '@/components/FormSelect/interfaces'

export type IFormSelectExtended = {
    label: string
} & Omit<IFormSelect, 'id'>
