import { FormikProvider, FormikContextType } from "formik";
import { IForm } from "./interfaces";

const Form = ({ children, formik, ...args }: IForm) => {
    return (
        <form onSubmit={formik.handleSubmit} {...args}>
            <FormikProvider value={formik}>
                {children}
            </FormikProvider>
        </form>
    )
}

export default Form;