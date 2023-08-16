import { ChangeEventHandler, FocusEventHandler } from 'react'

export type IFormSelect = React.PropsWithChildren<{
    name: string
    id: string
    className?: string
    onChange?: ChangeEventHandler<HTMLSelectElement>
    onBlur?: FocusEventHandler<HTMLSelectElement>
    placeholder?: string
    required?: boolean
    disabled?: boolean
}>
