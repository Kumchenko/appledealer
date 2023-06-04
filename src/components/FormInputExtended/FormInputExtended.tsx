import clsx from "clsx"
import styles from "./sass/FormInputExtended.module.scss"
import FormError from "../FormError/FormError"
import FormInput from "../FormInput/FormInput"
import { IFormInputExtended } from "./interfaces"
import { useFormikContext } from "formik"

const FormInputExtended = ({className, label, name, disabled, ...args}: IFormInputExtended) => {
    const {getFieldMeta} = useFormikContext();
    const {error, touched} = getFieldMeta(name);
    return (
        <label className={clsx(styles.form__field, className)}>
            {label}
            <FormError className={styles.form__error} error={error} touched={touched} />
            <FormInput className={styles.form__input} name={name} {...args}/>
        </label>
    )
}

export default FormInputExtended;