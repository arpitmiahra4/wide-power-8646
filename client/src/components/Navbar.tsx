import React from 'react'
import {
  Button,
  Flex,
  chakra,
  useDisclosure,
  useColorModeValue,
  HStack,
  Box,
  VisuallyHidden,
  IconButton,
  VStack,
  CloseButton,
  Avatar,
  Image
} from '@chakra-ui/react';
import Styles from '../styles/Navbar.module.css'
import { AiOutlineMenu , AiFillHome  , AiFillBell  } from "react-icons/ai";
import { BsPlus , BsFillPersonFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  return (
    <React.Fragment>
      <chakra.header
        bg={bg}
        w="full"
        px={{
          base: 2,
          sm: 4,
        }}
        py={4}
        shadow="md"
        className={Styles.Navline}
        border="2px solid #44d62c"
        borderRadius={20}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto" >
          <HStack display="flex" spacing={3} alignItems="center">
            <Box
              display={{
                base: "inline-flex",
                md: "none",
              }}
              className={Styles.Navline}
            >
              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <Button w="full" variant="ghost" leftIcon={<AiFillHome size={20} />}>
                  Dashboard
                </Button>
                <Button
                  w="full"
                  variant="ghost"
                  colorScheme="brand"
                  leftIcon={<BsPlus size={20} />}
                >
                  Singup
                </Button>
                <Link to={"/login"}><Button
                  w="full"
                  variant="ghost"
                  leftIcon={<BsFillPersonFill size={20} />}
                >
                  Login
                </Button>
                </Link>
              </VStack>
            </Box>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
             
              <Image src="https://i.ibb.co/SvM6jjQ/clip-art-word-search-word-game-vector-graphics-puzzle-2016-png-favpng-q-Xpjv0dhr8-Hq5j0-RFx-F0m-HDWx.png" w={20} />
            </chakra.a>

            <HStack
              spacing={3}
              display={{
                base: "none",
                md: "inline-flex",
              }}

            >
              <Button variant="ghost" leftIcon={<AiFillHome size={20} />} size="sm">
                Dashboard
              </Button>
              <Button
                 variant="ghost"
                colorScheme="brand"
                leftIcon={<BsPlus size={20} />}
                size="sm"
              >
                Singup
              </Button>
              <Link to={"/login"}><Button
                variant="ghost"
                leftIcon={<BsFillPersonFill size={20} />}
                size="sm"
              >
                Login
              </Button></Link>
            </HStack>
          </HStack>
          <HStack
            spacing={3}
            display={mobileNav.isOpen ? "none" : "flex"}
            alignItems="center"
          >
            <chakra.a
              p={3}
              color="gray.800"
              _dark={{
                color: "inherit",
              }}
              rounded="sm"
              _hover={{
                color: "gray.800",
                _dark: {
                  color: "gray.600",
                },
              }}
            >
              <AiFillBell />
              <VisuallyHidden>Notifications</VisuallyHidden>
            </chakra.a>

            <Avatar
              size="sm"
              name="Arpit Mishra"
              src="https://bit.ly/dan-abramov"
            />
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );

}

export default Navbar