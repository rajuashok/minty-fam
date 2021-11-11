import React, { useCallback, useContext } from 'react';
import Router from 'next/router';
import { Flex, Heading, Button, Spinner } from '@chakra-ui/react';
import AuthContext from '../context/AuthContext';
import { magic } from '../magic';
import Layout from '../components/Layout';
import Content from '../components/Content';

export default function Index() {
  const { user, logoutUser } = useContext(AuthContext);

  const logout = useCallback(() => {
    logoutUser();
  }, [Router]);

  const getAddress = useCallback(async () => {
    const didToken = await magic.user.getIdToken();
    const res = await fetch('/api/ip', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + didToken,
      }
    })
    if (res.status == 200) {
      console.log(await res.json());
    }
  }, [Router]);

  return (
    <Layout>
      <Content>
      {user
        ?
          <>
            <Heading mb={10}>Logged in user: {user.email}</Heading>
            <Flex width="100%" justifyContent="end">
              <Flex direction="column" alignItems="end">
                <Button colorScheme="green" p={22} w={100} mb={3} onClick={logout}>Logout</Button>
                <Button colorScheme="green" p={22} onClick={getAddress}>What's my Address?</Button>
              </Flex>
            </Flex>
          </>
        : <Spinner/>
      }
      </Content>
    </Layout>
  );
}
