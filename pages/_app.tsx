import '../styles/globals.css';
import Head from 'next/head';

import type { AppProps } from 'next/app';
import { Container, SSRProvider } from 'react-bootstrap';
import Layout from '../components/Layout';
import { SessionProvider } from 'next-auth/react';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { Analytics } from '@vercel/analytics/react';
config.autoAddCss = false;

function KentobeansLiveApp({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
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
            <GoogleAnalytics trackPageViews />

            <Component {...pageProps} />

            <Analytics />
          </Container>
        </Layout>
      </SessionProvider>
    </SSRProvider>
  );
}

export default KentobeansLiveApp;
