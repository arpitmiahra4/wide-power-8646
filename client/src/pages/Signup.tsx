import React, { Dispatch, useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  InputGroup,
  FormHelperText,
  InputRightElement,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
// import axios from 'axios';
import { SignupProps, UserDetails } from '../constants/constants';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/Auth/auth.actions';
import { Link } from 'react-router-dom';

const Form1 = ({
  userDetails,
  handleOnChange,
  existingUsername,
}: SignupProps) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        User Registration
      </Heading>
      <Flex>
        <FormControl isRequired>
          <FormLabel htmlFor="username" fontWeight={'normal'}>
            Username
          </FormLabel>
          <Input
            id="username"
            name="username"
            outline={existingUsername ? '2px solid red' : ''}
            onChange={handleOnChange}
            placeholder="Username"
            required
            border="2px solid #44d62c"
          />
          {existingUsername && (
            <FormHelperText color={'red'}>
              Username already taken
            </FormHelperText>
          )}
        </FormControl>
      </Flex>
      <FormControl isRequired mt="2%">
        <FormLabel htmlFor="email" fontWeight={'normal'}>
          Email address
        </FormLabel>
        <Input
          id="email"
          type="email"
          placeholder="Enter Email Address"
          name="email"
          onChange={handleOnChange}
          value={userDetails.email}
          required
          border="2px solid #44d62c"
        />
        <FormHelperText color={'whiteAlpha.500'}>
          We'll never share your email.
        </FormHelperText>
      </FormControl>
      <FormControl isRequired>
        <FormLabel htmlFor="password" fontWeight={'normal'} mt="2%">
          Password
        </FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Enter password"
            name="password"
            onChange={handleOnChange}
            border="2px solid #44d62c"
          />
          <InputRightElement width="5.5rem">
            <Button
              h="1.75rem"
              size={'md'}
              bg={'transparent'}
              color={'black'}
              onClick={handleClick}
            >
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};

const Form3 = ({ userDetails, handleOnChange }: SignupProps) => {

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal">
         For Award Distribution
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl isRequired id="email" mt={1}>
          <FormLabel fontSize="sm" fontWeight="md" color="white">
            Mobile Number
          </FormLabel>
          <Input
            placeholder="Enter Mobile Number"
            shadow="sm"
            type={"Number"}
            focusBorderColor="brand.400"
            name="mobile"
            onChange={handleOnChange}
            fontSize={{
              sm: 'sm',
            }}
            border="2px solid #44d62c"
          />
          <FormHelperText>
            It's for your Awards. To send Amount.
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export default function Signup() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: "",
    email: "",
    password: "",
    mobile: 0,
    no_of_wins: 0,
    no_of_looses: 0,
    scores: 0,
  });

  const [existingUsername, setExistingUsername] = useState<boolean>(false);

  const dispatch: Dispatch<any> = useDispatch();

  const handleOnChange = (e: any): void => {
    const name = e.target.name;
    let value = e.target.value;

    // if (name === 'username') {
    //   axios
    //     .get(`http://localhost:8080/users?q=${value}`)
    //     .then((res) => {
    //       if (res.data.users.length > 0) {
    //         setExistingUsername(true);
    //       } else {
    //         setExistingUsername(false);
    //       }
    //     })
    //     .catch((err) => console.log(err));
    // }

    // if (name === 'skills') {
    //   value = value.split(',');
    // }

    setUserDetails((values) => ({ ...values, [name]: value }));
  };

  const handleOnSubmit = () => {
    dispatch(registerUser(userDetails));

    toast({
      title: 'Account created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
        bg={'#1a202c'}
        color={'white'}
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
          colorScheme={'purple'}
        ></Progress>
        {step === 1 ? (
          <Form1
            userDetails={userDetails}
            handleOnChange={handleOnChange}
            existingUsername={existingUsername}
          />
        ) : step === 2 ? (
          <Form3 userDetails={userDetails} handleOnChange={handleOnChange} />
        ) : (
          <Form3 userDetails={userDetails} handleOnChange={handleOnChange} />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="purple"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3 || existingUsername}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="purple"
                variant="outline"
              >
                Next
              </Button>
              <Button
                variant={'ghosted'}
                colorScheme={'purple'}
                color={'purple.200'}
              >
                <Link to={'/login'}>Already registered? Login</Link>
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={handleOnSubmit}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
