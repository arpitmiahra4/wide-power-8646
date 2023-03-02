import React from 'react'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  Text
} from '@chakra-ui/react';

const Signup = () => {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'3xl'} color="red.200">Sign up</Heading>
          <Heading fontSize={'2xl'} color="teal.400">Register an account</Heading>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input border="2px solid #44d62c" type="text" placeholder="Username" />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input border="2px solid #44d62c" type="email" placeholder="Email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input border="2px solid #44d62c" type="password" placeholder="Password" />
          </FormControl>
          <FormControl id="number">
            <FormLabel>Phone Number</FormLabel>
            <Input border="2px solid #44d62c" type="number" placeholder="Phone Number" />
          </FormControl>
          <Stack spacing={6}>
            <Button colorScheme={'blue'} fontWeight="bold" fontSize={20} variant={'solid'}>
              Signup
            </Button>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              fontSize={20}
              justify={'center'}>
              <Text color="black" fontSize={15}>Already have an account?</Text>
              <Link color={'blue'} fontSize={15}>Login</Link>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://giffiles.alphacoders.com/202/202342.gif'
          }
        />
      </Flex>
    </Stack>
  );
}

export default Signup