export interface IFormSelectProps {
    name: string
}

export type IFormSelect = {} & IFormSelectProps & React.ComponentProps<'select'> & React.PropsWithChildren
