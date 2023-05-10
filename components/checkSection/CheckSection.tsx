import Tile from "@/components/tile/Tile"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import clsx from "clsx"
import styles from "./check.module.scss"

interface FormValues {
    id: String
    tel: String
}

const CheckSection = () => {
    const initialValues: FormValues = {
        id: '',
        tel: ''
    }

    const validationSchema = Yup.object({
        id: Yup.string()
            .length(4, 'Лише 4 цифри')
            .matches(/[0-9]{4}/, 'Некоректний формат')
            .required('Обовʼязково'),
        tel: Yup.string()
            .matches(/[+]{1}38[0]{1}[0-9]{9}/, 'Некоректний формат')
            .required('Обовʼязково')
    });

    return (
        <section className={styles.check}>
            <div className={clsx(styles.container, 'container')}>
                <h1 className={styles.check__title}>
                    Статус замовлення
                </h1>
                <Tile className={styles.tile} title="Перевірочні дані" single={true}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values) => console.log(values)}
                        validationSchema={validationSchema}
                    >
                        <Form className={styles.form}>
                            <label className={clsx(styles.form__label, 'form__label')}>
                                Номер замовлення
                                <ErrorMessage className="form__error" name="id" component="span" />
                                <Field
                                    className="form__input"
                                    name="id"
                                    id="id"
                                    type="text"
                                    pattern="[0-9]{4}"
                                    placeholder="0001"
                                    required />
                            </label>
                            <label className={clsx(styles.form__label, 'form__label')}>
                                Номер телефону
                                <ErrorMessage className="form__error" name="tel" component="span" />
                                <Field
                                    className="form__input"
                                    name="tel"
                                    id="tel"
                                    type="tel"
                                    pattern="[+]{1}38[0]{1}[0-9]{9}"
                                    placeholder="+38(___)-___-__-__"
                                    required />
                            </label>
                            <button className="btn btn_green" type="submit">Перевірити</button>
                        </Form>
                    </Formik>
                </Tile>
            </div>
        </section>
    )
}

export default CheckSection