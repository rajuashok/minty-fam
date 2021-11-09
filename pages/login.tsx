import { useCallback, useState } from 'react';
import Router from 'next/router';
import { magic } from '../magic';
import { isWhitelisted } from '../lib/whitelisted';
import { Flex, Heading, Input, Button, Spinner } from '@chakra-ui/react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [badEmail, setBadEmail] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  /**
   * Perform login action via Magic's passwordless flow. Upon successuful
   * completion of the login flow, a user is redirected to the homepage.
   */
  const login = useCallback(async () => {
    if (!isWhitelisted(email)) {
      setBadEmail(true);
      return;
    }

    setIsLoggingIn(true);

    try {
      // Grab auth token from loginWithMagicLink
      const didToken = await magic.auth.loginWithMagicLink({
        email,
        showUI: false,
        redirectURI: new URL('/callback', window.location.origin).href,
      });

      // Validate auth token with server
      const res = await fetch('/api/login', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + didToken,
        },
      });
      res.status === 200 && Router.push('/');
    } catch {
      setIsLoggingIn(false);
    }
  }, [email]);

  /**
   * Saves the value of our email input into component state.
   */
  const handleInputOnChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex width={600} bgColor="gray.200" direction="column" alignItems="start" padding={20} rounded={10}>
        <Heading mb={12}>Please sign up or login</Heading>
        <Input
          variant="filled"
          bgColor="gray.50"
          mb={6}
          type='email'
          name='email'
          required={true}
          placeholder='Enter your email'
          onChange={handleInputOnChange}
          disabled={isLoggingIn}
        />
        {badEmail && <Alert status="error" mb={6}>
          <AlertIcon />
          <AlertTitle mr={2}>Invalid Email</AlertTitle>
          <AlertDescription mr={8}>That email is not associated with a minty mofo.</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setBadEmail(false)}/>
        </Alert>}
        <Flex width="100%" justifyContent="end">
          <Button colorScheme="green" onClick={login} disabled={isLoggingIn}>
            {isLoggingIn
              ? <Spinner />
              : <>Send</>}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
