import '@/styles/globals.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { useEffect } from 'react'
import store from '@/store'
import { Provider } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import { ModalWrapper } from '@/components/ModalWrapper/ModalWrapper'
import { Modal } from '@/utils/Modal'
import { AppPropsWithLayout } from '@/interfaces'

// FontAwesome set up
config.autoAddCss = false

// Our modal ref
let modalWrapperRef: ModalWrapper | null;

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  // Register modalWrapper
  useEffect(() => {
    Modal.registerModal(modalWrapperRef);
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <Provider store={store}>
      {getLayout(<Component key={router.pathname} {...pageProps} />)}
      <ModalWrapper ref={ref => modalWrapperRef = ref} />
    </Provider>
  )
}

export default appWithTranslation(MyApp);