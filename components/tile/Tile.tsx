import clsx from "clsx"
import React from "react"
import styles from './tile.module.scss'

interface TileProps extends React.PropsWithChildren {
    title: String
    className?: String
    single?: Boolean
}

const Tile: React.FC<TileProps> = ({title, children, className, single = false}) => {
    return (
        <div className={clsx(styles.tile, single && styles.tile_single, className)}>
            <h5 className={styles.tile__title}>{title}</h5>
            {children}
        </div>
    )
}

export default Tile;