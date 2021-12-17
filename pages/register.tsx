import React, { useCallback, useContext } from 'react';
import { Flex, Heading, Button, Spinner, Input, FormLabel, FormControl } from '@chakra-ui/react';
import AuthContext from '../context/AuthContext';
import Layout from '../components/Layout';
import Content from '../components/Content';
import { post } from '../lib/api';
import { Field, Form, Formik } from 'formik';

export default function Index() {
  const { user, setUser } = useContext(AuthContext);

  const register = useCallback(async (values) => {
    if (!values) {
      console.log("Must provide values");
      return;
    }
    
    try {
      const newUser = {
        ...user,
        ...values
      };
      const res = await post('/api/user', newUser, true)
      if (res.status == 200) {
        const updatedUser = (await res.json()).user;
        setUser(updatedUser);
      } else {
        throw new Error(`Got a ${res.status} code when trying to update user.`);
      }
    } catch (e) {
      console.log('Failed to register: ', e);
    }
  }, []);

  return (
    <Layout>
      <Content>
      {user
        ?
          <>
            <Heading mb={10}>Registration for {user.email}</Heading>
            <Flex width="100%">
              <Formik
                initialValues={{
                  name: user.name,
                  playaName: user.playaName,
                  phone: user.phone,
                  hasTicket: user.hasTicket ? "Yes" : "No",
                }}
                onSubmit={async (values, actions) => {
                  await register(values);
                  actions.setSubmitting(false);
                }}
              >
                {(props) => (
                  <Form style={{width: "100%"}}>
                    <Flex width="100%" flexDirection="row" mb={6}>
                      {/* Default world details (name and phone #) */}
                      <Field name='name'>
                        {({ field, form }) => (
                          <FormControl mr={12} id={field.name} isInvalid={form.errors.name && form.touched.name} isRequired>
                            <FormLabel htmlFor={field.name}>Legal name</FormLabel>
                            <Input
                              variant="filled"
                              bgColor="gray.50"
                              {...field}
                              id={field.name}
                              placeholder='Jennifer Doe' />
                            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                          </FormControl>
                        )}
                      </Field>
                      <Field name='phone'>
                        {({ field, form }) => (
                          <FormControl id={field.name} isInvalid={form.errors.name && form.touched.name} isRequired>
                            <FormLabel htmlFor={field.name}>Phone Number</FormLabel>
                            <Input
                              variant="filled"
                              bgColor="gray.50"
                              {...field}
                              id={field.name}
                              placeholder='So we can holler at you!' />
                            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Field name='playaName'>
                      {({ field, form }) => (
                        <FormControl id={field.name} isInvalid={form.errors.name && form.touched.name} mb={6}>
                          <FormLabel htmlFor={field.name}>Playa name</FormLabel>
                          <Input
                            variant="filled"
                            bgColor="gray.50"
                            {...field}
                            id={field.name}
                            placeholder='Desert Warrior Prince of Playa Stardust Face' />
                          {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                        </FormControl>
                      )}
                    </Field>
                    <Flex width="100%" mb={12} flexDirection="column">
                      <Field name='arriveDate'>
                        {({ field, form }) => (
                          <FormControl mb={6} id={field.name} isInvalid={form.errors.name && form.touched.name} isRequired>
                            <FormLabel htmlFor={field.name}>Arrive Date</FormLabel>
                            <Input
                              type="date"
                              variant="filled"
                              bgColor="gray.50"
                              {...field}
                              id={field.name} />
                            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                          </FormControl>
                        )}
                      </Field>
                      <Field name='leaveDate'>
                        {({ field, form }) => (
                          <FormControl mr={12} id={field.name} isInvalid={form.errors.name && form.touched.name} isRequired>
                            <FormLabel htmlFor={field.name}>Leave Date</FormLabel>
                            <Input
                              type="date"
                              variant="filled"
                              bgColor="gray.50"
                              {...field}
                              id={field.name} />
                            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Flex flexDirection="row" justifyContent="space-between" alignItems="top">
                      <FormLabel mr={12} as='legend'>Do you have a ticket to the burn?</FormLabel>
                      <label>
                        <Flex flexDirection="row" alignItems="center">
                          <Field type="radio" name="hasTicket" value="Yes" />
                          <Flex ml={3}>Yes</Flex>
                        </Flex>
                      </label>
                      <label>
                        <Flex flexDirection="row" alignItems="center">
                          <Field type="radio" name="hasTicket" value="No" />
                          <Flex ml={3}>No</Flex>
                        </Flex>
                      </label>
                    </Flex>
                    <Flex width="100%" justifyContent="end">
                      <Button
                        mt={12}
                        colorScheme='green'
                        isLoading={props.isSubmitting}
                        type='submit'
                      >
                        Submit
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </Flex>
          </>
        : <Spinner/>
      }
      </Content>
    </Layout>
  );
}
