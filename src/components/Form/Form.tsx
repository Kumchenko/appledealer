import { FormikProvider } from "formik";
import { IForm } from "./interfaces";

const Form = ({ children, className, formik }: IForm) => {
    return (
        <form className={className} onSubmit={formik.handleSubmit}>
            <FormikProvider value={formik}>
                {children}
            </FormikProvider>
        </form>
    )
}

export default Form;