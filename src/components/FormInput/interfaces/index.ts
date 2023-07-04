export type IFormInputProps = {
    name: string
} & React.PropsWithChildren

export type IFormInput = {} & IFormInputProps  & React.ComponentProps<'input'>;