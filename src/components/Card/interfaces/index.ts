import React from "react"

export interface ICardProps extends React.PropsWithChildren, React.ComponentProps<'div'> {
    title?: string,
    titleClass?: string,
    single?: Boolean,
}