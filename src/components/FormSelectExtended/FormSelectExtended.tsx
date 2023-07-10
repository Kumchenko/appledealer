import clsx from "clsx"
import styles from "./sass/FormSelectExtended.module.scss"
import FormError from "../FormError/FormError"
import FormSelect from "../FormSelect/FormSelect"
import { IFormSelectExtended } from "./interfaces"
import { useFormikContext } from "formik"

const FormSelectExtended = ({
    className,
    label,
    name,
    placeholder,
    disabled,
    required,
    children
}: IFormSelectExtended) => {
    const { getFieldMeta } = useFormikContext();
    const { error, touched } = getFieldMeta(name);
    return (
        <label className={clsx(styles.form__field, className)}>
            {label}
            <FormError className={styles.form__error} error={error} touched={touched} />
            <FormSelect
                className={styles.form__select}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
            >
                {children}
            </FormSelect>
        </label>
    )
}

export default FormSelectExtended;