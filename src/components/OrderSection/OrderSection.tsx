import Image from "next/image"
import Card from "@/components/Card/Card"
import styles from "./sass/Order.module.scss"
import clsx from "clsx"

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const OrderSection = () => {
    const initialValues = {
        model: '',
        name: '',
        surname: '',
        tel: '',
        email: '',
        component: 'display',
        quality: 'original'
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Обовʼязково'),
        surname: Yup.string()
            .required('Обовʼязково'),
        tel: Yup.string()
            .matches(/[+]{1}38[0]{1}[0-9]{9}/, 'Некоректний формат')
            .required('Обовʼязково'),
        email: Yup.string()
            .matches(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Некоректний формат')
            .required('Обовʼязково')
    });

    return (
        <section className={styles.order}>
            <div className={clsx(styles.container, "container")}>
                <h1 className={styles.order__title}>Замовити ремонт</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => console.log(values)}
                    validationSchema={validationSchema}
                >
                    <Form className={clsx(styles.form, "form grid")}>
                        <Card title="Модель" className={styles.form__card}>
                            <Field style={{ marginBottom: 10 }} component="select" className="form__select" name="model" id="model">
                                <option value="" disabled>Оберіть модель</option>
                                <option value="iphone-13-mini">iPhone 13 Mini</option>
                                <option value="iphone-13">iPhone 13</option>
                                <option value="iphone-13-pro">iPhone 13 Pro</option>
                                <option value="iphone-13-pro-max">iPhone 13 Pro Max</option>
                            </Field>
                            <Image className={styles.form__img} src="/img/iphones/iphone-13-mini.png" width={280} height={260} priority={false} alt="iPhone 13 Mini" />
                        </Card>
                        <Card title="Контактні дані" className={styles.form__card}>
                            <label className={clsx(styles.form__label, 'form__label')}>
                                Імʼя
                                <ErrorMessage className="form__error" name="name" component="span" />
                                <Field className="form__input"
                                    name="name"
                                    id="name"
                                    type="text"
                                    placeholder="Ваше імʼя"
                                    required />
                            </label>
                            <label className={clsx(styles.form__label, 'form__label')}>
                                Прізвище
                                <ErrorMessage className="form__error" name="surname" component="span" />
                                <Field className="form__input"
                                    name="surname"
                                    id="surname"
                                    type="text"
                                    placeholder="Ваше прізвище"
                                    required />
                            </label>
                            <label className={clsx(styles.form__label, 'form__label')}>
                                Телефон
                                <ErrorMessage className="form__error" name="tel" component="span" />
                                <Field className="form__input"
                                    name="tel"
                                    id="tel"
                                    type="tel"
                                    pattern="[+]{1}38[0]{1}[0-9]{9}"
                                    placeholder="+38(___)-___-__-__"
                                    required />
                            </label>
                            <label className={clsx(styles.form__label, 'form__label')}>
                                Email
                                <ErrorMessage className="form__error" name="email" component="span" />
                                <Field className="form__input"
                                    name="email"
                                    id="email"
                                    type="email"
                                    placeholder="example@example.com"
                                    required />
                            </label>
                        </Card>
                        <Card title="Замовлення" className={styles.form__card}>
                            <label className={clsx(styles.form__label, 'form__label')}>
                                Компонент
                                <ErrorMessage className="form__error" name="component" component="span" />
                                <Field component="select" className="form__select" name="component" id="component">
                                    <option value="display">Дисплей</option>
                                    <option value="battery">Акумулятор</option>
                                    <option value="housing">Корпус</option>
                                    <option value="rear-camera">Основна камера</option>
                                </Field>
                            </label>
                            <label className={clsx(styles.form__label, 'form__label')}>
                                Якість
                                <ErrorMessage className="form__error" name="quality" component="span" />
                                <Field component="select" className="form__select" name="quality" id="quality">
                                    <option value="original">Оригінал</option>
                                    <option value="high-copy">Копія високої якості</option>
                                </Field>
                            </label>
                            <button className={clsx(styles.form__btn, "btn btn_green")} type="submit">Замовити</button>
                        </Card>
                    </Form>
                </Formik>
            </div>
        </section>
    )
}

export default OrderSection