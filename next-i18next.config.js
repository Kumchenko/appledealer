/** @type {import('next-i18next').UserConfig} */

module.exports = {
    i18n: {
        locales: ['uk', 'ru', 'en'],
<<<<<<< Updated upstream
        defaultLocale: 'uk'
    }
=======
        defaultLocale: 'uk',
    },
    localePath:
        typeof window === 'undefined'
            ? require('path').resolve('./public/locales')
            : './public/locales',
    reloadOnPrerender: 
        process.env.NODE_ENV === 'production'
            ? false
            : true
>>>>>>> Stashed changes
}