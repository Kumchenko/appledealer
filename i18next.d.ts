// import the original type declarations
import 'i18next'
// import all namespaces (for the default language, only)
import common from 'locales/uk/common.json'
import check from 'locales/uk/check.json'
import error from 'locales/uk/error.json'
import index from 'locales/uk/index.json'
import order from 'locales/uk/order.json'
import repair from 'locales/uk/repair.json'
import status from 'locales/uk/status.json'
import thanks from 'locales/uk/thanks.json'
import timer from 'locales/uk/timer.json'

declare module 'i18next' {
    // Extend CustomTypeOptions
    interface CustomTypeOptions {
        // custom namespace type, if you changed it
        defaultNS: 'common'
        // custom resources type
        resources: {
            common: typeof common
            check: typeof check
            error: typeof error
            index: typeof index
            order: typeof order
            repair: typeof repair
            status: typeof status
            thanks: typeof thanks
            timer: typeof timer
        }
        returnNull: false
        // other
    }
}
