import React, { useCallback, useContext } from 'react';
import Router from 'next/router';
import { Flex, Heading, Button, Spinner } from '@chakra-ui/react';
import AuthContext from '../context/AuthContext';

export default function Index() {
  const { user, logoutUser } = useContext(AuthContext);

  const logout = useCallback(() => {
    logoutUser();
  }, [Router]);

  return user ? (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex bgColor="gray.200" direction="column" alignItems="end" background="light.background" padding={20} rounded={10}>
        <Heading mb={10}>Logged in user: {user.email}</Heading>
        <Button colorScheme="green" p={22} w={100} onClick={logout}>Logout</Button>
      </Flex>
    </Flex>
  ) : (
    <Spinner />
  );
}
