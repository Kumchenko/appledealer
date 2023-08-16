import { FormikContextType } from 'formik'

export type IForm = {
    className?: string
    formik: FormikContextType<any>
} & React.PropsWithChildren
