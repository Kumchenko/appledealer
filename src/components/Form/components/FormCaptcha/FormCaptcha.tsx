import ReCaptcha from 'react-google-recaptcha'
import { env } from '@/constants/env'
import FormError from '../FormError/FormError'
import { IFormCaptcha } from './interfaces'
import { useFormikContext } from 'formik'
import { useRouter } from 'next/router'
import styles from './sass/FormCaptcha.module.scss'

const FormCaptcha = ({ name, size, className }: IFormCaptcha) => {
    const { locale } = useRouter()

    const { getFieldMeta, getFieldProps, setFieldValue } = useFormikContext()
    const { touched, error } = getFieldMeta(name)
    const { onBlur } = getFieldProps(name)

    return (
        <div className={className}>
            <ReCaptcha
                size={size}
                sitekey={env.captchaSiteKey}
                onChange={token => setFieldValue(name, token)}
                onBlur={onBlur}
                theme="light"
                hl={locale}
            />
            <FormError className={styles.form__error} error={error} touched={touched} />
        </div>
    )
}

export default FormCaptcha
