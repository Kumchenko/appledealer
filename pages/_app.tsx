import Head from 'next/head'
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer/Footer"
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/globals.scss'
import { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { animated, useTransition } from '@react-spring/web'

config.autoAddCss = false


// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps, router }: AppProps) {
  const [pagesArr, setPagesArr] = useState([<Component key={router.asPath} {...pageProps} />]);

  const transitions = useTransition(pagesArr, {
    from: { opacity: 0, x: '100%' },
    enter: { opacity: 1, x: '0px' },
    leave: { opacity: 0, x: '-50%', position: 'absolute' }
  })

  useEffect(() => {
    setPagesArr([<Component key={router.asPath} {...pageProps} />])
  }, [Component, pageProps, router.asPath]);

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Head>
        <title>AppleDealer</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>
      <Header />
      {transitions((style, item) => <animated.div style={style}>{item}</animated.div>)}
      <Footer />
    </div>
  )
}