import { FormikContextType } from "formik";

export type IForm = {
    formik: FormikContextType<any>
} & React.PropsWithChildren & React.ComponentProps<'form'>