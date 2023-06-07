import clsx from "clsx";
import styles from "./sass/FormSelect.module.scss"
import { IFormSelect } from "./interfaces";
import { useFormikContext } from "formik";

const FormSelect = ({
    name,
    className,
    placeholder,
    children,
    onChange,
    onBlur,
    ...args
}: IFormSelect) => {
    const { handleBlur, handleChange, getFieldProps } = useFormikContext();
    const { value } = getFieldProps(name);
    return (
        <select
            name={name}
            className={clsx(styles.form__select, className)}
            value={value}
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
        >
            <option value="" disabled>{placeholder}</option>
            {children}
        </select>
    )
}

export default FormSelect;