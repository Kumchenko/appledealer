export const env = {
    api: process.env.NEXT_PUBLIC_API_URL,
    mapKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    mode: process.env.NODE_ENV,
    captchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '',
    isDev() {
        return this.mode === 'development'
    },
    isProd() {
        return this.mode === 'production'
    },
}
