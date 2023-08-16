import { PropsWithChildren } from 'react'

export type ICardProps = PropsWithChildren<{
    title?: string
    className?: string
    titleClass?: string
    single?: boolean
}>
