// Για να βάλουμε meta data στην εφαρμογή μας.
import Head from 'next/head';

import Layout from '../Component/layout/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewporrt' content='width=device-width, initial-scale=1'/>
        
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
