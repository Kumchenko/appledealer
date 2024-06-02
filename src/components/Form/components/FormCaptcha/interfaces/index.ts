import { ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute } from 'react'

export type IFormCaptcha = {
    name: string
    className?: string
    size?: 'compact' | 'normal' | 'invisible'
}
