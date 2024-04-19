import clsx from 'clsx'
import styles from './sass/FormInputExtended.module.scss'
import FormError from '../FormError/FormError'
import FormInput from '../FormInput/FormInput'
import { IFormInputExtended } from './interfaces'
import { useFormikContext } from 'formik'
import { useId } from 'react'

const FormInputExtended = ({
    mask = '',
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
    pattern,
}: IFormInputExtended) => {
    const { getFieldMeta } = useFormikContext()
    const { error, touched } = getFieldMeta(name)
    const id = useId()
    return (
        <div className={clsx(styles.form__field, className)}>
            <label htmlFor={id}>{label}</label>
            <FormError className={styles.form__error} error={error} touched={touched} />
            <FormInput
                name={name}
                id={id}
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
        </div>
    )
}

export default FormInputExtended
