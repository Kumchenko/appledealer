export interface IFormErrorProps extends React.HTMLProps<HTMLSpanElement>{
    error: string | undefined,
    touched: boolean | undefined
}