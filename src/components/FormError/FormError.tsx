import { IFormError } from "./interfaces"

const FormError = ({ error, touched, className }: IFormError) => {
    return (
        (error && touched) ? <span className={className}>{error}</span> : null
    )
}

export default FormError