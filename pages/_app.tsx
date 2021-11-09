import Head from 'next/head';
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../lib/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Magic Next.js</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
