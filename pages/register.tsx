import React, { useContext } from 'react';
import { Flex, Heading, Button, Spinner } from '@chakra-ui/react';
import AuthContext from '../context/AuthContext';
import Layout from '../components/Layout';
import Content from '../components/Content';

export default function Index() {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      <Content>
      {user
        ?
          <>
            <Heading mb={10}>Registration for {user.name} ({user.email})</Heading>
          </>
        : <Spinner/>
      }
      </Content>
    </Layout>
  );
}
