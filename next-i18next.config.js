/** @type {import('next-i18next').UserConfig} */

module.exports = {
    i18n: {
        locales: ['uk', 'ru', 'en'],
        defaultLocale: 'uk',
    },
    localePath:
        typeof window === 'undefined'
            ? require('path').resolve('./public/locales')
            : './public/locales',
}