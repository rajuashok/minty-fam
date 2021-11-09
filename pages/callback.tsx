import { useEffect } from 'react';
import Router from 'next/router';
import { magic } from '../magic';
import { Spinner } from '@chakra-ui/spinner';

export default function Callback() {
  useEffect(() => {
    // On mount, we try to login with a Magic credential in the URL query.
    magic.auth.loginWithCredential().then(async (didToken) => {
      // Validate auth token with server
      const res = await fetch('/api/login', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });
      res.status === 200 && Router.push('/');
    });
  }, []);

  return <Spinner />;
}
