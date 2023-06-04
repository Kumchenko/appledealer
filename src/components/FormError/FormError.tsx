import { IFormError } from "./interfaces"

const FormError = ({error, touched, ...args}: IFormError) => {
    return (
        (error && touched) ? <span {...args}>{error}</span> : null
    )
}

export default FormError