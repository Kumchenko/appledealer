import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/globals.scss'
import { AppProps } from 'next/app';

config.autoAddCss = false


// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AppleDealer</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}