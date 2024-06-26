import Image from 'next/image'
import Card from '@/components/Card/Card'
import styles from './sass/Order.module.scss'
import clsx from 'clsx'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { IModels } from '@/interfaces'
import { fetchComponents, clearComponents } from '@/api/Component/ComponentSlice'
import { fetchServices, clearServices } from '@/api/Service/ServicesSlice'
import { useDispatch, useSelector } from '@/api/store'
import { useEffect, useMemo, useState } from 'react'
import Form, { FormCaptcha } from '../../../../components/Form/Form'
import FormSelect from '../../../../components/Form/components/FormSelect/FormSelect'
import FormInputExtended from '../../../../components/Form/components/FormInputExtended/FormInputExtended'
import FormSelectExtended from '../../../../components/Form/components/FormSelectExtended/FormSelectExtended'
import { useTransition, a } from '@react-spring/web'
import { PulseLoader } from 'react-spinners'
import { postOrder } from '@/api/Order/OrderSlice'
import { LoadingStatus, orderInitialValues as initialValues } from '@/constants'
import { useRouter } from 'next/router'
import { useTranslation, useUpdate } from '@/hooks'
import Button from '../../../../components/Button/Button'
import emptyPhone from 'public/img/iphones/empty.jpg'
import { Modal } from '@/utils'
import { env } from '@/constants/env'
import ReCaptcha from 'react-google-recaptcha'

const OrderSection = ({ modelIds }: IModels) => {
    const { t } = useTranslation()
    const router = useRouter()
    const dispatch = useDispatch()

    // Clear preloaded components and models when changing page
    useEffect(
        () => () => {
            dispatch(clearComponents())
            dispatch(clearServices())
        },
        [dispatch],
    )

    const { componentIds, loadingStatus: componentsLoadingStatus } = useSelector(
        ({ componentsSlice }) => componentsSlice,
    )
    const { services, loadingStatus: servicesLoadingStatus } = useSelector(({ servicesSlice }) => servicesSlice)

    // Validation Schema for form
    const validationSchema = Yup.object({
        modelId: Yup.string().oneOf(modelIds, t('errors.occured')).required(t('errors.necessary')),
        name: Yup.string()
            .required(t('errors.necessary'))
            .min(3, args => t('errors.min', { count: args.min }))
            .max(20, args => t('errors.max', { count: args.max })),
        surname: Yup.string()
            .required(t('errors.necessary'))
            .min(3, args => t('errors.min', { count: args.min }))
            .max(20, args => t('errors.max', { count: args.max })),
        tel: Yup.string()
            .matches(/[+]{1}38[0]{1}[0-9]{9}/, t('errors.incorrect'))
            .required(t('errors.necessary')),
        email: Yup.string()
            .matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, t('errors.incorrect'))
            .required(t('errors.necessary')),
        componentId: Yup.string().oneOf(componentIds, t('errors.occured')).required(t('errors.necessary')),
        qualityId: Yup.string()
            .oneOf(
                services.map(service => service.qualityId),
                t('errors.occured'),
            )
            .required(t('errors.necessary')),
        captchaToken: Yup.string()
            .nonNullable()
            .min(1, t('errors.captcha_required'))
            .required(t('errors.captcha_required')),
    })

    // Initialize formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values =>
            dispatch(postOrder(values))
                .unwrap()
                .then(({ id, tel }) => {
                    router.push(`/status?id=${id}&tel=${encodeURIComponent(tel)}&thanks=true`)
                })
                .catch(() => {}),
    })
    const { values, errors, isSubmitting } = formik

    // Prepate Model selector Placeholder value
    const modelPlaceholder = useMemo(() => {
        if (modelIds.length > 0) {
            return t('order:select-model')
        } else {
            return t('order:no-models')
        }
    }, [modelIds.length, t])

    // Prepare Component selector Placeholder value
    const componentPlaceholder = useMemo(() => {
        switch (componentsLoadingStatus) {
            case LoadingStatus.Idle: {
                return t('order:first-select-model')
            }
            case LoadingStatus.Error: {
                return t('order:no-components')
            }
            case LoadingStatus.Fetching: {
                return t('loading')
            }
            case LoadingStatus.Fetched: {
                if (componentIds.length > 0) {
                    return t('order:select-component')
                }
                return t('order:no-components')
            }
            default: {
                const exhaustiveCheck: never = componentsLoadingStatus
                return t('errors.occured')
            }
        }
    }, [componentIds, componentsLoadingStatus, t])

    // Prepare Quality selector Placeholder value
    const qualityPlaceholder = useMemo(() => {
        switch (servicesLoadingStatus) {
            case LoadingStatus.Idle: {
                return t('order:first-select-component')
            }
            case LoadingStatus.Error: {
                return t('order:no-qualities')
            }
            case LoadingStatus.Fetching: {
                return t('loading')
            }
            case LoadingStatus.Fetched: {
                if (services.length > 0) {
                    return t('order:select-quality')
                }
                return t('order:no-qualities')
            }
            default: {
                const exhaustiveCheck: never = servicesLoadingStatus
                return t('errors.occured')
            }
        }
    }, [services, servicesLoadingStatus, t])

    // Preparing options for select elements
    const modelElems = useMemo(
        () =>
            modelIds
                .map(modelId => (
                    <option key={modelId} value={modelId}>
                        {t(`repair:${modelId}`)}
                    </option>
                ))
                .sort((a, b) => a.props.children.localeCompare(b.props.children)),
        [modelIds, t],
    )
    const componentElems = useMemo(
        () =>
            componentIds
                .map(componentId => (
                    <option key={componentId} value={componentId}>
                        {t(`repair:${componentId}`)}
                    </option>
                ))
                .sort((a, b) => a.props.children.localeCompare(b.props.children)),
        [componentIds, t],
    )
    const qualityElems = useMemo(
        () =>
            services
                .map(({ qualityId }) => (
                    <option key={qualityId} value={qualityId}>
                        {t(`repair:${qualityId}`)}
                    </option>
                ))
                .sort((a, b) => a.props.children.localeCompare(b.props.children)),
        [services, t],
    )

    // Download available components for selected model
    const getComponents = (modelId: string) => {
        dispatch(fetchComponents(modelId))
    }

    // Download available services for selected model and component
    const getServices = (modelId: string, componentId: string) => {
        dispatch(fetchServices({ modelId, componentId }))
    }

    // Catching changes of model
    useUpdate(() => {
        setModelList([values.modelId])
        formik.setFieldValue('componentId', initialValues.componentId)
        formik.setFieldValue('qualityId', initialValues.qualityId)
        dispatch(clearComponents())
        if (values.modelId) {
            getComponents(values.modelId)
        }
    }, [values.modelId])

    // Catching changes of component
    useUpdate(() => {
        const { modelId, componentId } = values
        formik.setFieldValue('qualityId', initialValues.qualityId)
        dispatch(clearServices())
        if (modelId && componentId) {
            getServices(modelId, componentId)
        }
    }, [values.componentId])

    // Prepare text for submit button
    const submitText = useMemo(() => {
        const service = services.find(service => service.qualityId === values.qualityId)
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
        if (service) {
            return `${t('order:submit')}: ${service.cost}₴`
        } else {
            return t('order:submit')
        }
    }, [isSubmitting, services, t, values.qualityId])

    // Transition implementation
    const [modelList, setModelList] = useState([initialValues.modelId])
    const transitions = useTransition(modelList, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0, position: 'absolute' },
        delay: 200,
    })

    return (
        <section className={styles.order}>
            <div className={clsx(styles.container, 'container')}>
                <h1 className={styles.order__title}>{t('order:h1')}</h1>
                <Form formik={formik} className={clsx(styles.form, 'grid')}>
                    <Card title={t('order:model')} className={styles.form__card}>
                        <FormSelect
                            id="modelId"
                            className={clsx(styles.form__field, styles.form__field_model)}
                            name="modelId"
                            placeholder={modelPlaceholder}
                        >
                            {modelElems}
                        </FormSelect>
                        <div className={styles.form__animatedWrapper}>
                            {transitions((style, item) => (
                                <a.div style={style} className={styles.form__animated}>
                                    <Image
                                        className={styles.form__img}
                                        src={item && !errors.modelId ? `/img/iphones/${item}.jpg` : emptyPhone}
                                        layout="fill"
                                        quality={90}
                                        priority={true}
                                        alt={item}
                                    />
                                </a.div>
                            ))}
                        </div>
                    </Card>
                    <Card
                        title={t('order:contact-data')}
                        className={`${styles.form__card} ${styles.form__card_contacts}`}
                    >
                        <FormInputExtended
                            className={styles.form__field}
                            label={t('name')}
                            name="name"
                            type="text"
                            placeholder={t('your-name')}
                            autoComplete="on"
                            required
                        />
                        <FormInputExtended
                            className={styles.form__field}
                            label={t('surname')}
                            name="surname"
                            type="text"
                            placeholder={t('your-surname')}
                            autoComplete="on"
                            required
                        />
                        <FormInputExtended
                            mask="+380999999999"
                            className={styles.form__field}
                            label={t('tel')}
                            name="tel"
                            type="tel"
                            pattern="[+]{1}38[0]{1}[0-9]{9}"
                            placeholder="+380"
                            autoComplete="tel"
                            required
                        />
                        <FormInputExtended
                            className={styles.form__field}
                            label={t('email')}
                            name="email"
                            type="email"
                            placeholder="example@example.com"
                            autoComplete="on"
                            required
                        />
                    </Card>
                    <Card title={t('order:order')} className={styles.form__card}>
                        <FormSelectExtended
                            className={styles.form__field}
                            label={t('component')}
                            name="componentId"
                            placeholder={componentPlaceholder}
                            disabled={!values.modelId}
                        >
                            {componentElems}
                        </FormSelectExtended>
                        <FormSelectExtended
                            className={styles.form__field}
                            label={t('quality')}
                            name="qualityId"
                            placeholder={qualityPlaceholder}
                            disabled={!values.componentId}
                        >
                            {qualityElems}
                        </FormSelectExtended>
                        <FormCaptcha
                            className={`${styles.form__field} ${styles.form__captcha}`}
                            name="captchaToken"
                            size="compact"
                        />
                        <Button
                            disabled={isSubmitting || !values.qualityId}
                            className={styles.form__btn}
                            type="submit"
                            color="green"
                        >
                            {submitText}
                        </Button>
                    </Card>
                </Form>
            </div>
        </section>
    )
}

export default OrderSection
