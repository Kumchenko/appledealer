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
import { useTranslation } from "@/hooks/useTranslation";


const CheckSection = () => {
    const { t: c } = useTranslation('check');
    const { t } = useTranslation();
    const router = useRouter();
    const dispatch = useDispatch();
    const { loadingStatus: orderLoadingStatus } = useSelector(({ orderSlice }) => orderSlice);

    const initialValues: IOrderReqQuery = {
        id: '',
        tel: ''
    }

    const validationSchema = Yup.object({
        id: Yup.string()
            .length(4, args => t('errors.only', { count: args.length }))
            .matches(/[0-9]{4}/, t('errors.incorrect'))
            .required(t('errors.necessary')),
        tel: Yup.string()
            .matches(/[+]{1}38[0]{1}[0-9]{9}/, t('errors.incorrect'))
            .required(t('errors.necessary'))
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
    const { isSubmitting } = formik;

    // Prepare text for submit button
    const submitText = useMemo(() => {
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
        return c('submit');
    }, [c, isSubmitting, orderLoadingStatus, t]);

    return (
        <section className={styles.check}>
            <div className={clsx(styles.container, 'container')}>
                <h1 className={styles.check__title}>
                    {c('h1')}
                </h1>
                <Card className={styles.card} title={c('header')} single={true}>
                    <Form className={styles.form} formik={formik}>
                        <FormInputExtended
                            label={c('order-num')}
                            className={styles.form__field}
                            name="id"
                            type="text"
                            pattern="[0-9]{4}"
                            placeholder="0001"
                            required
                        />
                        <FormInputExtended
                            label={c('tel-num')}
                            className={styles.form__field}
                            name="tel"
                            type="tel"
                            pattern="[+]{1}38[0]{1}[0-9]{9}"
                            placeholder="+38(___)-___-__-__"
                            autoComplete="on"
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