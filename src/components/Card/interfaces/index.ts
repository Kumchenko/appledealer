import React from "react"

export interface ICardProps extends React.PropsWithChildren {
    title: String
    className?: String
    single?: Boolean
}