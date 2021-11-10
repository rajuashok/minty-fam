import Head from 'next/head';
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../lib/theme';
import { AuthProvider } from '../context/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Magic Next.js</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
