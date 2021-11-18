import React, { useCallback, useContext, useState } from 'react';
import { Flex, Heading, Button, Spinner, Input } from '@chakra-ui/react';
import AuthContext from '../context/AuthContext';
import Layout from '../components/Layout';
import Content from '../components/Content';
import { post } from '../lib/api';

export default function Index() {
  const { user, setUser } = useContext(AuthContext);
  const [name, setName] = useState<string>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const handleInputOnChange = useCallback((event) => {
    setName(event.target.value);
  }, [])

  const register = useCallback(async () => {
    if (!name) {
      console.log("Must provide name");
      return;
    }
    setIsRegistering(true);
    
    try {
      const newUser = {
        ...user,
        name
      }
      const res = await post('/api/user', newUser, true)
      if (res.status == 200) {
        const updatedUser = (await res.json()).user;
        setUser(updatedUser);
        setIsRegistering(false);
      } else {
        throw new Error(`Got a ${res.status} code when trying to update user.`);
      }
    } catch (e) {
      setIsRegistering(false);
      console.log('Failed to register: ', e);
    }
  }, [name])

  return (
    <Layout>
      <Content>
      {user
        ?
          <>
            <Heading mb={10}>Registration for {user.name} ({user.email})</Heading>
            <Input
              variant="filled"
              bgColor="gray.50"
              mb={6}
              type="text"
              name="name"
              required={true}
              placeholder="What's your legal name?"
              onChange={handleInputOnChange}
              disabled={isRegistering}
              />
              <Flex width="100%" justifyContent="end">
                <Button colorScheme="green" onClick={register} disabled={isRegistering}>
                  {isRegistering
                    ? <Spinner/>
                    : <>Register</>}
                </Button>
              </Flex>
          </>
        : <Spinner/>
      }
      </Content>
    </Layout>
  );
}
