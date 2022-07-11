import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import type { FC } from 'react';
import '@/styles/globals.css';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <NextNProgress color="#FFFFFF" />
    <Component {...pageProps} />
  </>
);
export default App;
