import { FormikProvider } from 'formik'
import { IForm } from './interfaces'

const Form = ({ children, className, formik }: IForm) => {
    return (
        <form className={className} onSubmit={formik.handleSubmit}>
            <FormikProvider value={formik}>{children}</FormikProvider>
        </form>
    )
}

export default Form
export { default as FormInput } from './components/FormInput/FormInput'
export { default as FormInputExtended } from './components/FormInputExtended/FormInputExtended'
export { default as FormSelect } from './components/FormSelect/FormSelect'
export { default as FormSelectExtended } from './components/FormSelectExtended/FormSelectExtended'
export { default as FormError } from './components/FormError/FormError'
