import { useTranslation } from '@/hooks'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Form, { FormCaptcha } from '../Form/Form'
import FormInputExtended from '../Form/components/FormInputExtended/FormInputExtended'
import styles from './sass/CallModal.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useMemo, useRef } from 'react'
import { PulseLoader } from 'react-spinners'
import { Modal } from '@/utils'
import Button from '../Button/Button'
import { callInitialValues as initialValues } from '@/constants'
import call from '@/api/call'

const CallModal = ({ closeModal }: { closeModal: Function }) => {
    const { t } = useTranslation()

    // Ref of submit button
    const submitRef = useRef<HTMLButtonElement>(null)

    // Setting focus on submitBtn for correct handling events on ModalWrapper and better User Experience
    useEffect(() => {
        submitRef.current?.focus()
    }, [])

    // Creating Validation schema for form
    const validationSchema = Yup.object({
        name: Yup.string()
            .required(t('errors.necessary'))
            .min(3, args => t('errors.min', { count: args.min }))
            .max(20, args => t('errors.max', { count: args.max })),
        tel: Yup.string()
            .matches(/[+]{1}38[0]{1}[0-9]{9}/, t('errors.incorrect'))
            .required(t('errors.necessary')),
        captchaToken: Yup.string()
            .nonNullable()
            .min(1, t('errors.captcha_required'))
            .required(t('errors.captcha_required')),
    })

    // Initializing formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            call.post('/callmes', values)
                .then(() =>
                    Modal.open({
                        autoClose: 3000,
                        title: t('call-me-success'),
                    }),
                )
                .catch(() => {})
                .finally(() => closeModal())
        },
    })
    const { isSubmitting } = formik

    // Prepare text for submit button
    const submitText = useMemo(() => {
        if (isSubmitting) {
            return (
                <PulseLoader
                    color={styles.white}
                    className={styles.form__loader}
                    loading={isSubmitting}
                    aria-label="Loading pulseloader"
                />
            )
        }
        return t('call-me-back')
    }, [isSubmitting, t])

    return (
        <div className={styles.call}>
            <p className={styles.call__desc}>{t('call-me-detail')}</p>
            <div className={styles.call__iconWrapper}>
                <FontAwesomeIcon className={styles.call__icon} icon={faPhone} />
            </div>
            <Form className={styles.form} formik={formik}>
                <FormInputExtended
                    label={t('name')}
                    className={styles.form__field}
                    name="name"
                    type="text"
                    placeholder={t('your-name')}
                    autoComplete="on"
                    required
                />
                <FormInputExtended
                    label={t('tel')}
                    className={styles.form__field}
                    mask="+380999999999"
                    name="tel"
                    type="tel"
                    pattern="[+]{1}38[0]{1}[0-9]{9}"
                    placeholder="+380"
                    autoComplete="tel"
                    required
                />
                <FormCaptcha className={`${styles.form__field} ${styles.form__captcha}`} name="captchaToken" />
                <Button type="submit" disabled={isSubmitting} ref={submitRef} color="green">
                    {submitText}
                </Button>
            </Form>
        </div>
    )
}

export default CallModal
