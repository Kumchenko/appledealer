import Card from "@/components/Card/Card";
import Form from "../Form/Form";
import { useFormik } from "formik";
import * as Yup from 'yup';
import clsx from "clsx";
import styles from "./sass/Сheck.module.scss";
import FormInputExtended from "../FormInputExtended/FormInputExtended";
import { getOrder } from "@/slices/OrderSlice";
import { useDispatch, useSelector } from "@/store";
import { useRouter } from "next/router";
import { IOrderReqQuery } from "pages/api/interfaces";
import { useMemo } from "react";
import { PulseLoader } from "react-spinners";


const CheckSection = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { loadingStatus: orderLoadingStatus } = useSelector(({ orderSlice }) => orderSlice)

    const initialValues: IOrderReqQuery = {
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

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            dispatch(getOrder(values)).unwrap()
                .then(() => {
                    router.push('/status')
                })
                .catch(() => {
                    formik.resetForm();
                })
        }
    });
    const { values, errors, isSubmitting} = formik;

    // Prepare text for submit button
    const submitText = useMemo(() => {
        if (orderLoadingStatus === 'error') {
            return 'Виникла помилка'
        }
        if (isSubmitting) {
            return <PulseLoader
                color={styles.white}
                className={styles.form__loader}
                loading={isSubmitting}
                aria-label="Loading pulseloader" />;
        }
        return "Перевірити";
    }, [isSubmitting, orderLoadingStatus]);

    return (
        <section className={styles.check}>
            <div className={clsx(styles.container, 'container')}>
                <h1 className={styles.check__title}>
                    Перевірити статус замовлення
                </h1>
                <Card className={styles.card} title="Перевірочні дані" single={true}>
                    <Form className={styles.form} formik={formik}>
                        <FormInputExtended
                            label="Номер замовлення"
                            className={styles.form__field}
                            name="id"
                            type="text"
                            pattern="[0-9]{4}"
                            placeholder="0001"
                            required
                        />
                        <FormInputExtended
                            label="Номер телефону"
                            className={styles.form__field}
                            name="tel"
                            type="tel"
                            pattern="[+]{1}38[0]{1}[0-9]{9}"
                            placeholder="+38(___)-___-__-__"
                            required
                        />
                        <button
                            className="btn btn_green"
                            type="submit"
                        >
                            {submitText}
                        </button>
                    </Form>
                </Card>
            </div>
        </section>
    )
}

export default CheckSection