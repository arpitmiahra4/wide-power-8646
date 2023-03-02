import React from 'react'
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
  } from '@chakra-ui/react';
const Login = () => {
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
              <Heading fontSize={'3xl'} color="red.200">Log-in to</Heading>
              <Heading fontSize={'2xl'} color="teal.400">Play..Buddy</Heading>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input border="2px solid #44d62c" type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input border="2px solid #44d62c" type="password" />
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  fontSize={20}
                  justify={'space-between'}>
                  <Checkbox  >Remember me</Checkbox>
                  <Link color={'red'} fontSize={20}>Forgot password?</Link>
                </Stack>
                <Button colorScheme={'blue'} fontWeight="bold" fontSize={20} variant={'solid'}>
                  Login
                </Button>
              </Stack>
            </Stack>
          </Flex>
          <Flex flex={1}>
            <Image
              alt={'Login Image'}
              objectFit={'cover'}
              src={
                'https://64.media.tumblr.com/812cf4dd53d093100d7aef0a74774640/cfb1a85ffe3fa238-0b/s400x600/bc4f93868c67c6cd3dbb5491ba5223c3f5f0ac7d.gif'
              }
            />
          </Flex>
        </Stack>
      );
}

export default Login;