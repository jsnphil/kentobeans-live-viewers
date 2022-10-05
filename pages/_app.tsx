import '../styles/globals.css';
import Head from 'next/head';

import type { AppProps } from 'next/app';
import { Container, SSRProvider } from 'react-bootstrap';
import Layout from '../components/Layout';
import { SessionProvider } from 'next-auth/react';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <Layout>
          <Head>
            <title>Kentobeans Live</title>
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1'
            />
            <meta
              name='description'
              content='Home for Kentobeans7 Drum Streams'
            />
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Container>
            <Component {...pageProps} />
          </Container>
        </Layout>
      </SessionProvider>
    </SSRProvider>
  );
}

export default MyApp;
