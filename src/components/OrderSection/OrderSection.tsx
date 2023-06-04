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

interface IInitialValues {
    model: string,
    name: string,
    surname: string,
    tel: string,
    email: string,
    component: string,
    quality: string
}

const OrderSection = ({ models }: IModels) => {
    const dispatch = useDispatch();
    const { components, loadingStatus: componentsLoadingStatus } = useSelector(({ componentsSlice }) => componentsSlice);
    const { services, loadingStatus: servicesLoadingStatus } = useSelector(({ servicesSlice }) => servicesSlice);

    // Initial form values
    const initialValues = {
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
            .oneOf(models.map(model => model.id), 'Помилка')
            .required('Обовʼязково'),
        name: Yup.string()
            .required('Обовʼязково')
            .min(3, 'Мін. 3 симв.')
            .max(20, 'Макс. 20 симв.'),
        surname: Yup.string()
            .required('Обовʼязково')
            .min(3, 'Мін. 3 симв.')
            .max(20, 'Макс. 20 симв.'),
        tel: Yup.string()
            .matches(/[+]{1}38[0]{1}[0-9]{9}/, 'Некоректний формат')
            .required('Обовʼязково'),
        email: Yup.string()
            .matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Некоректний формат')
            .required('Обовʼязково'),
        component: Yup.string()
            .oneOf(components.map(component => component.id), 'Помилка')
            .required('Обовʼязково'),
        quality: Yup.string()
            .oneOf(services.map(service => service.quality.id), 'Помилка')
            .required('Обовʼязково')
    });

    // Initialize formik
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => console.log(values),
    })
    const { values, errors, touched, isSubmitting } = formik;

    // Prepare Component selector Placeholder value
    const componentPlaceholder = useMemo(() => {
        switch (componentsLoadingStatus) {
            case 'idle': {
                return 'Спочатку оберіть модель'
            }
            case 'error': {
                return 'Немає компонент'
            }
            case 'fetching': {
                return 'Завантаження...'
            }
            case 'fetched': {
                return 'Оберіть компонент'
            }
        }
    }, [componentsLoadingStatus]);

    // Prepare Quality selector Placeholder value
    const qualityPlaceholder = useMemo(() => {
        switch (servicesLoadingStatus) {
            case 'idle': {
                return 'Спочатку оберіть компонент'
            }
            case 'error': {
                return 'Помилка'
            }
            case 'fetching': {
                return 'Завантаження...'
            }
            case 'fetched': {
                return 'Оберіть якість'
            }
        }
    }, [servicesLoadingStatus]);

    // Preparing options for select elements
    const modelElems = useMemo(() => models.map(({ id, name }) => <option key={id} value={id}>{name}</option>), [models]);
    const componentElems = useMemo(() => components.map(({ id, name }) => <option key={id} value={id}>{name}</option>), [components]);
    const qualityElems = useMemo(() => services.map(({ quality: { id, name } }) => <option key={id} value={id}>{name}</option>), [services]);

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
        getComponents(values.model);
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
        if (service) {
            return `Замовити: ${service.cost}₴`;
        } else {
            return 'Замовити';
        }
    }, [services, values.quality]);

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
                <h1 className={styles.order__title}>Замовити ремонт</h1>
                <Form formik={formik} className={clsx(styles.form, "grid")}>
                    <Card title="Модель" className={styles.form__card}>
                        <FormSelect
                            style={{ marginBottom: 10 }}
                            className={styles.form__field}
                            name="model"
                            placeholder="Оберіть модель"
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
                    <Card title="Контактні дані" className={styles.form__card}>
                        <FormInputExtended
                            className={styles.form__field}
                            label="Імʼя"
                            name="name"
                            type="text"
                            placeholder="Ваше імʼя"
                            required
                        />
                        <FormInputExtended
                            className={styles.form__field}
                            label="Прізвище"
                            name="surname"
                            type="text"
                            placeholder="Ваше прізвище"
                            required
                        />
                        <FormInputExtended
                            className={styles.form__field}
                            label="Телефон"
                            name="tel"
                            type="tel"
                            pattern="[+]{1}38[0]{1}[0-9]{9}"
                            placeholder="+38(___)-___-__-__"
                            required
                        />
                        <FormInputExtended
                            className={styles.form__field}
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="example@example.com"
                            required 
                        />
                    </Card>
                    <Card title="Замовлення" className={styles.form__card}>
                        <FormSelectExtended
                            className={styles.form__field}
                            label="Компонент"
                            name="component"
                            placeholder={componentPlaceholder}
                            disabled={!(values.model)}
                        >
                            {componentElems}
                        </FormSelectExtended>
                        <FormSelectExtended
                            className={styles.form__field}
                            label="Якість"
                            name="quality"
                            placeholder={qualityPlaceholder}
                            disabled={!(values.component)}
                        >
                            {qualityElems}
                        </FormSelectExtended>
                        <button
                            disabled={isSubmitting || !(values.quality)}
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
