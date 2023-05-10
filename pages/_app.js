import Head from 'next/head';
import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"
import TransitionLayout from "../components/transitionLayout/TransitionLayout"
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import './globals.scss';

config.autoAddCss = false


// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>AppleDealer</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>
      <Header />
      <TransitionLayout>
        <Component {...pageProps} />
      </TransitionLayout>
      <Footer />
    </>
  )
}