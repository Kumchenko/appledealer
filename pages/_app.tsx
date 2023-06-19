import '@/styles/globals.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { config } from '@fortawesome/fontawesome-svg-core'
import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { a, useTransition } from '@react-spring/web'
import store from '@/store'
import { Provider } from 'react-redux'
import { appWithTranslation } from 'next-i18next'
import { NavPoints, SocialPoints } from '@/constants'
import { ModalWrapper } from '@/components/ModalWrapper/ModalWrapper'
import { Modal } from '@/utils/Modal'
import { useNextCssRemovalPrevention } from '@madeinhaus/nextjs-page-transition'

config.autoAddCss = false

//our modal ref
let modalWrapperRef: any;

function MyApp({ Component, pageProps, router }: AppProps) {
  const [pagesArr, setPagesArr] = useState([<Component key={router.pathname} {...pageProps} />]);

  const transitions = useTransition(pagesArr, {
    from: { opacity: 0, x: '100%' },
    enter: { opacity: 1, x: '0px' },
    leave: { opacity: 0, x: '-50%', position: 'absolute' }
  })

  // Temporary fix for Page Transition while officialy not fixed
  useNextCssRemovalPrevention();

  useEffect(() => {
    setPagesArr([<Component key={router.pathname} {...pageProps} />])
  }, [Component, router.pathname, pageProps]);

  // Register modalWrapper
  useEffect(() => {
    Modal.registerModal(modalWrapperRef);
  }, []);

  return (
    <Provider store={store}>
      <div style={{ overflowX: 'hidden' }}>
        <Header navPoints={NavPoints} socialPoints={SocialPoints} />
        {transitions((style, item) => <a.div style={style}>{item}</a.div>)}
        <Footer />
      </div>
      <ModalWrapper ref={ref => modalWrapperRef = ref} />
    </Provider>
  )
}

export default appWithTranslation(MyApp);