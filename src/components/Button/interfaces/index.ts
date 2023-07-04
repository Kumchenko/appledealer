import { HTMLAttributeAnchorTarget } from "react"

export type IButton = {
    color: "green" | "purple"
    href?: string
    target?: HTMLAttributeAnchorTarget 
} 
& React.PropsWithChildren 
& React.ComponentPropsWithRef<'button'>