export type IFormInputProps = {
    name: string
}

export type IFormInput = {} & IFormInputProps & React.PropsWithChildren & React.ComponentProps<'input'>;