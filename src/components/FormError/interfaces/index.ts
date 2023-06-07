export interface IFormErrorProps {
    error: string | undefined,
    touched: boolean | undefined
}

export interface IFormError extends IFormErrorProps, React.HTMLProps<HTMLSpanElement> {}