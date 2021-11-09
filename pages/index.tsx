import React, { useEffect, useState, useCallback } from 'react';
import Router from 'next/router';
import { magic } from '../magic';
import { MagicUserMetadata } from '@magic-sdk/types';
import { Flex, Heading, Button, Spinner } from '@chakra-ui/react';

export default function Index() {
  const [userMetadata, setUserMetadata] = useState<MagicUserMetadata>();

  useEffect(() => {
    // On mount, we check if a user is logged in.
    // If so, we'll retrieve the authenticated user's profile.
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then(setUserMetadata);
      } else {
        // If no user is logged in, redirect to `/login`
        Router.push('/login');
      }
    });
  }, []);

  /**
   * Perform logout action via Magic.
   */
  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      Router.push('/login');
    });
  }, [Router]);

  return userMetadata ? (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex bgColor="gray.200" direction="column" alignItems="end" background="light.background" padding={20} rounded={10}>
        <Heading mb={10}>Logged in user: {userMetadata.email}</Heading>
        <Button colorScheme="green" p={22} w={100} onClick={logout}>Logout</Button>
      </Flex>
    </Flex>
  ) : (
    <Spinner />
  );
}
