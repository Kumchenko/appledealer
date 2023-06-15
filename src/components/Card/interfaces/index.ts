import React from "react"

export interface ICardProps extends React.ComponentPropsWithoutRef<'div'> {
    title?: string,
    titleClass?: string,
    single?: Boolean,
}