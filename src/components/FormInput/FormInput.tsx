import clsx from "clsx";
import styles from "./sass/FormInput.module.scss"
import { IFormInput } from "./interfaces";
import { useFormikContext } from "formik";

const FormInput = ({ name, className, onChange, onBlur, ...args }: IFormInput) => {
    const { handleBlur, handleChange, getFieldProps } = useFormikContext();
    const { value } = getFieldProps(name);
    return (
        <input
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
            {...args}
        />
    )
}

export default FormInput;