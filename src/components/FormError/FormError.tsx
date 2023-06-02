import clsx from "clsx"
import { IFormErrorProps } from "./interfaces"

const FormError = ({error, touched, className, ...args}: IFormErrorProps) => {
    return (
        (error && touched) ? <span className={clsx("form__error", className)} {...args}>{error}</span> : null
    )
}

export default FormError