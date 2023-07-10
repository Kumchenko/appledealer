import clsx from "clsx"
import styles from "./sass/FormInputExtended.module.scss"
import FormError from "../FormError/FormError"
import FormInput from "../FormInput/FormInput"
import { IFormInputExtended } from "./interfaces"
import { useFormikContext } from "formik"

const FormInputExtended = ({
    mask = "",
    className,
    label,
    name,
    onChange,
    onBlur,
    placeholder,
    type,
    autoComplete,
    required,
    disabled,
    pattern
}: IFormInputExtended) => {
    const { getFieldMeta } = useFormikContext();
    const { error, touched } = getFieldMeta(name);
    return (
        <label className={clsx(styles.form__field, className)}>
            {label}
            <FormError
                className={styles.form__error}
                error={error}
                touched={touched}
            />
            <FormInput
                name={name}
                className={styles.form__input}
                mask={mask}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                type={type}
                autoComplete={autoComplete}
                required={required}
                disabled={disabled}
                pattern={pattern}
            />
        </label>
    )
}

export default FormInputExtended;