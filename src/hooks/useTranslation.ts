import { useMemo } from "react";
import { useTranslation as useNextTranslation } from "next-i18next";
import { UseTranslationOptions } from "react-i18next";

export function useTranslation(ns?: string, options?: UseTranslationOptions) {
    const { t, i18n } = useNextTranslation(ns, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const T = useMemo(() => t, [i18n]);
    return { t: T, i18n };
}