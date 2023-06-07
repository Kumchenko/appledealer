import { FormikContextType } from "formik";

export interface IForm extends React.ComponentProps<'form'> {
    formik: FormikContextType<any>
}