import React, { useCallback, useContext, useState } from 'react';
import { Flex, Heading, Button, Spinner, Input, FormLabel, FormControl, RadioGroup, HStack, Radio, FormHelperText } from '@chakra-ui/react';
import AuthContext from '../context/AuthContext';
import Layout from '../components/Layout';
import Content from '../components/Content';
import { post } from '../lib/api';
import { Field, Form, Formik } from 'formik';

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
            <Heading mb={10}>Registration for {user.email}</Heading>
            <Flex width="100%">
              <Formik
                initialValues={{}}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2))
                    actions.setSubmitting(false)
                  }, 1000)
                }}
              >
                {(props) => (
                  <Form style={{width: "100%"}}>
                    {/* <Heading mb={6} as="h3" size="md" color="gray.500">Default world details</Heading> */}
                    <Flex width="100%" flexDirection="row" mb={6}>
                      {/* Default world details (name and phone #) */}
                      <Field name='default_name'>
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
                    {/* <Heading as="h3" size="md" color="gray.500" mt={16} mb={6}>Going back, back to the playa, playa!</Heading> */}
                    <Field name='playa_name'>
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
                      <Field name='arrive_date'>
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
                      <Field name='leave_date'>
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
                    <Field name="has_ticket">
                      {({ field, form }) => (
                        <FormControl id={field.name} as='fieldset' mb={6} isRequired>
                          <Flex flexDirection="row" justifyContent="space-between">
                            <FormLabel mr={12} as='legend'>Do you have a ticket to the burn?</FormLabel>
                            <RadioGroup defaultValue='No'>
                              <HStack spacing='24px'>
                                <Radio bgColor="gray.300" value='Yes'>Yes</Radio>
                                <Radio bgColor="gray.300" value='No'>No</Radio>
                              </HStack>
                            </RadioGroup>
                          </Flex>
                          {/* <FormHelperText>Select only if you're a fan.</FormHelperText> */}
                        </FormControl>
                      )}
                    </Field>
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
            {/* <Formik
              initialValues={{ default_name: '' }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2))
                  actions.setSubmitting(false)
                }, 1000)
              }}>
                {(props) => {
                  <Form>
                    <Field name="default_name">
                      {({ field, form }) => {
                        <FormControl id={field.name} isRequired>
                          <FormLabel htmlFor={field.name}>Default World Name</FormLabel>
                          <Input
                            variant="filled"
                            bgColor="gray.50"
                            mb={6}
                            {...field}
                            id={field.name}
                            placeholder='Legal name please' />
                        </FormControl>
                      }}
                    </Field>
                    <Flex width="100%" justifyContent="end">
                      <Button colorScheme="green" isLoading={props.isSubmitting} type="submit">
                        Register
                      </Button>
                    </Flex>
                  </Form>
                }}
            </Formik> */}
            {/* <FormControl id="email">
              <FormLabel>Default World Name</FormLabel>
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
                /> */}
            {/* </FormControl> */}
          </>
        : <Spinner/>
      }
      </Content>
    </Layout>
  );
}
