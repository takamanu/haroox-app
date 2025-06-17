import 'raf/polyfill'
import 'setimmediate'

import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'

import '../global.css'
import { AppProps } from 'next/app'
import { PaperProvider } from 'react-native-paper'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <PaperProvider> */}
      <Head>
        <title>Solito Example App</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
      {/* </PaperProvider> */}
    </>
  )
}

export default MyApp
