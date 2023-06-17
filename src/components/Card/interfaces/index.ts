import React from "react"

export interface ICardProps extends React.PropsWithChildren {
    title?: string,
    className?: string,
    titleClass?: string,
    single?: Boolean
}