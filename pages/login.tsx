import { useCallback, useContext, useState } from 'react';
import { Flex, Heading, Input, Button, Spinner } from '@chakra-ui/react';
import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton } from '@chakra-ui/react';
import AuthContext, { AuthFailedError, InvalidEmailError } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [authFailed, setAuthFailed] = useState<string>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { loginUser } = useContext(AuthContext);
  /**
   * Perform login action via Magic's passwordless flow. Upon successuful
   * completion of the login flow, a user is redirected to the homepage.
   */
  const login = useCallback(async () => {
    setIsLoggingIn(true);

    try {
      await loginUser(email);
    } catch (e) {
      setIsLoggingIn(false);
      if (e instanceof InvalidEmailError) {
        setAuthFailed("That email is not associated with a minty mofo.");
      } else if (e instanceof AuthFailedError) {
        // ignore for now.
      }
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
        {authFailed && <Alert status="error" mb={6}>
          <AlertIcon />
          <AlertDescription mr={8}>{ authFailed }</AlertDescription>
          <CloseButton position="absolute" right="8px" top="8px" onClick={() => setAuthFailed(null)}/>
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
