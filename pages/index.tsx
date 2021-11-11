import React, { useCallback, useContext } from 'react';
import Router from 'next/router';
import { Flex, Heading, Button, Spinner } from '@chakra-ui/react';
import AuthContext from '../context/AuthContext';
import Layout from '../components/Layout';
import Content from '../components/Content';

export default function Index() {
  const { user, logoutUser } = useContext(AuthContext);

  const logout = useCallback(() => {
    logoutUser();
  }, [Router]);

  return (
    <Layout>
      <Content>
      {user
        ?
          <>
            <Heading mb={10}>Welcome {user.name} ({user.email})</Heading>
            <Flex width="100%" justifyContent="end">
              <Flex direction="column" alignItems="end">
                <Button colorScheme="green" p={22} w={100} mb={3} onClick={logout}>Logout</Button>
              </Flex>
            </Flex>
          </>
        : <Spinner/>
      }
      </Content>
    </Layout>
  );
}
