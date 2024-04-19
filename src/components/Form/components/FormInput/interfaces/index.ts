import { ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute } from 'react'

export type IFormInput = React.PropsWithChildren<{
    mask?: string | (RegExp | string)[]
    id: string
    name: string
    className?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
    onBlur?: FocusEventHandler<HTMLInputElement>
    type?: HTMLInputTypeAttribute
    placeholder?: string
    required?: boolean
    disabled?: boolean
    autoComplete?: string
    pattern?: string
}>
