import Image from "next/image"
import Card from "@/components/Card/Card"
import styles from "./sass/Order.module.scss"
import clsx from "clsx"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { IModels } from "@/interfaces"
import { fetchComponents, clearComponents } from "@/slices/ComponentSlice"
import { fetchServices, clearServices } from "@/slices/ServicesSlice"
import { useDispatch, useSelector } from "@/store"
import { useMemo, useState } from "react"
import useUpdate from "@/hooks/useUpdate"
import Form from "../Form/Form"
import FormSelect from "../FormSelect/FormSelect"
import FormInputExtended from "../FormInputExtended/FormInputExtended"
import FormSelectExtended from "../FormSelectExtended/FormSelectExtended"
import { useTransition, a } from "@react-spring/web"
import { PulseLoader } from "react-spinners"
import { postOrder } from "@/slices/OrderSlice"
import { IOrderReqBody } from "pages/api/interfaces"
import { useRouter } from "next/router"
import { useTranslation } from "@/hooks/useTranslation"


const OrderSection = ({ models }: IModels) => {
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();

    const {
        components,
        loadingStatus: componentsLoadingStatus
    } = useSelector(({ componentsSlice }) => componentsSlice);
    const {
        services,
        loadingStatus: servicesLoadingStatus
    } = useSelector(({ servicesSlice }) => servicesSlice);
    const { loadingStatus: orderLoadingStatus } = useSelector(({ orderSlice }) => orderSlice)

    // Initial form values
    const initialValues: IOrderReqBody = {
        model: '',
        name: '',
        surname: '',
        tel: '',
        email: '',
        component: '',
        quality: ''
    };

    // Validation Schema for form
    const validationSchema = Yup.object({
        model: Yup.string()
            .oneOf(models.map(model => model.id), t('errors.occured'))
            .required(t('errors.necessary')),
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
        component: Yup.string()
            .oneOf(components.map(component => component.id), t('errors.occured'))
            .required(t('errors.necessary')),
        quality: Yup.string()
            .oneOf(services.map(service => service.quality.id), t('errors.occured'))
            .required(t('errors.necessary'))
    });

    // Initialize formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            dispatch(postOrder(values)).unwrap()
                .then(() => {
                    router.push('/thanks')
                })
                .catch(() => {
                    formik.resetForm();
                })
        }
    })
    const { values, errors, isSubmitting } = formik;

    // Prepate Model selector Placeholder value
    const modelPlaceholder = useMemo(() => {
        if (models.length > 0) {
            return t('order:select-model')
        } else {
            return t('order:no-models')
        }
    }, [models.length, t]);

    // Prepare Component selector Placeholder value
    const componentPlaceholder = useMemo(() => {
        switch (componentsLoadingStatus) {
            case 'idle': {
                return t('order:first-select-model')
            }
            case 'error': {
                return t('order:no-components')
            }
            case 'fetching': {
                return t('loading')
            }
            case 'fetched': {
                return t('order:select-component')
            }
        }
    }, [componentsLoadingStatus, t]);

    // Prepare Quality selector Placeholder value
    const qualityPlaceholder = useMemo(() => {
        switch (servicesLoadingStatus) {
            case 'idle': {
                return t('order:first-select-component')
            }
            case 'error': {
                return t('order.no-qualities')
            }
            case 'fetching': {
                return t('loading')
            }
            case 'fetched': {
                return t('order:select-quality')
            }
        }
    }, [servicesLoadingStatus, t]);

    // Preparing options for select elements
    const modelElems = useMemo(() => models.map(({ id }) =>
        <option key={id} value={id}>{t(`repair:${id}`)}</option>), [models, t]);
    const componentElems = useMemo(() => components.map(({ id }) =>
        <option key={id} value={id}>{t(`repair:${id}`)}</option>), [components, t]);
    const qualityElems = useMemo(() => services.map(({ quality: { id } }) =>
        <option key={id} value={id}>{t(`repair:${id}`)}</option>), [services, t]);

    // Download available components for selected model
    const getComponents = (model: string) => {
        dispatch(fetchComponents(model))
    }

    // Download available services for selected model and component
    const getServices = (model: string, component: string) => {
        dispatch(fetchServices({ model: model, component: component }));
    }

    // Catching changes of model
    useUpdate(() => {
        setModelList([values.model]);
        formik.setFieldValue('component', initialValues.component);
        formik.setFieldValue('quality', initialValues.quality);
        dispatch(clearComponents());
        if (values.model) {
            getComponents(values.model);
        }
    }, [values.model])

    // Catching changes of component
    useUpdate(() => {
        const { model, component } = values;
        formik.setFieldValue('quality', initialValues.quality);
        dispatch(clearServices());
        if (model && component) {
            getServices(model, component);
        }
    }, [values.component])

    // Prepare text for submit button
    const submitText = useMemo(() => {
        const service = services.find(service => service.quality.id === values.quality);
        if (orderLoadingStatus === 'error') {
            return t('errors.occured')
        }
        if (isSubmitting) {
            return <PulseLoader
                color={styles.white}
                className={styles.form__loader}
                loading={isSubmitting}
                aria-label="Loading pulseloader" />;
        }
        if (service) {
            return `${t('order:submit')}: ${service.cost}₴`;
        } else {
            return t('order:submit');
        }
    }, [isSubmitting, orderLoadingStatus, services, t, values.quality]);

    // Transition implementation
    const [modelList, setModelList] = useState([initialValues.model]);
    const transitions = useTransition(modelList, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0, position: 'absolute' },
        delay: 200
    })

    return (
        <section className={styles.order}>
            <div className={clsx(styles.container, "container")}>
                <h1 className={styles.order__title}>{t('order:h1')}</h1>
                <Form formik={formik} className={clsx(styles.form, "grid")}>
                    <Card title={t('order:model')} className={styles.form__card}>
                        <FormSelect
                            style={{ marginBottom: 10 }}
                            className={styles.form__field}
                            name="model"
                            placeholder={modelPlaceholder}
                        >
                            {modelElems}
                        </FormSelect>
                        <div className={styles.form__animatedWrapper}>
                            {transitions((style, item) => (
                                <a.div style={style} className={styles.form__animated}>
                                    <Image
                                        className={styles.form__img}
                                        src={item && !(errors.model) ? `/img/iphones/${item}.png` : `/img/iphones/empty.png`}
                                        layout="fill"
                                        quality={90}
                                        priority={true}
                                        alt={item}
                                    />
                                </a.div>
                            ))}
                        </div>
                    </Card>
                    <Card title={t('order:contact-data')} className={styles.form__card}>
                        <FormInputExtended
                            className={styles.form__field}
                            label={t('order:name')}
                            name="name"
                            type="text"
                            placeholder={t('order:your-name')}
                            autoComplete="on"
                            required
                        />
                        <FormInputExtended
                            className={styles.form__field}
                            label={t('order:surname')}
                            name="surname"
                            type="text"
                            placeholder={t('order:your-surname')}
                            autoComplete="on"
                            required
                        />
                        <FormInputExtended
                            className={styles.form__field}
                            label={t('order:tel')}
                            name="tel"
                            type="tel"
                            pattern="[+]{1}38[0]{1}[0-9]{9}"
                            placeholder="+38(___)-___-__-__"
                            autoComplete="on"
                            required
                        />
                        <FormInputExtended
                            className={styles.form__field}
                            label={t('order:email')}
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
                            label={t('order:component')}
                            name="component"
                            placeholder={componentPlaceholder}
                            disabled={!(values.model)}
                        >
                            {componentElems}
                        </FormSelectExtended>
                        <FormSelectExtended
                            className={styles.form__field}
                            label={t('order:quality')}
                            name="quality"
                            placeholder={qualityPlaceholder}
                            disabled={!(values.component)}
                        >
                            {qualityElems}
                        </FormSelectExtended>
                        <button
                            disabled={isSubmitting || !(values.quality) || orderLoadingStatus === 'error'}
                            className={clsx(styles.form__btn, "btn btn_green")}
                            type="submit"
                        >
                            {submitText}
                        </button>
                    </Card>
                </Form>
            </div>
        </section>
    )
}

export default OrderSection
