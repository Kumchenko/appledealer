import clsx from "clsx";
import styles from "./sass/FormInput.module.scss"
import { IFormInput } from "./interfaces";
import { useFormikContext } from "formik";
import InputMask from 'react-input-mask';
import { isSafari } from "react-device-detect";

const FormInput = ({
    mask = "",
    name,
    className,
    onChange,
    onBlur,
    placeholder,
    type,
    autoComplete,
    required,
    disabled,
    pattern
}: IFormInput) => {
    const { handleBlur, handleChange, getFieldProps } = useFormikContext();
    const { value } = getFieldProps(name);
    return (
        <InputMask
            mask={mask}
            maskChar={isSafari ? '_' : null}
            alwaysShowMask={false}
            name={name}
            value={value}
            className={clsx(styles.form__input, className)}
            onChange={(e) => {
                if (handleChange) {
                    handleChange(e);
                }
                if (onChange) {
                    onChange(e);
                }
            }}
            onBlur={(e) => {
                if (handleBlur) {
                    handleBlur(e);
                }
                if (onBlur) {
                    onBlur(e);
                }
            }}
            placeholder={placeholder}
            type={type}
            autoComplete={autoComplete}
            required={required}
            disabled={disabled}
            pattern={pattern}
        />
    )
}

export default FormInput;