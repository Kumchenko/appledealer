import { useMemo } from 'react'
import { useTranslation as useNextTranslation } from 'next-i18next'
import { UseTranslationOptions } from 'react-i18next'

export default function useTranslation(ns?: string, options?: UseTranslationOptions<string>) {
    const { t, i18n } = useNextTranslation(ns, options)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const T = useMemo(() => t, [i18n])
    return { t: T, i18n }
}

export const useOrderPageTranslation = () => useTranslation('order')
export const useRepairTranslation = () => useTranslation('repair')
export const useStatusPageTranslation = () => useTranslation('status')
export const useTimeTranslation = () => useTranslation('timer')
export const useCheckPageTranslation = () => useTranslation('check')
export const useIndexPageTranslation = () => useTranslation('index')
export const useErrorPageTranslation = () => useTranslation('error')
