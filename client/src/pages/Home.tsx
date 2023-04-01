import { 
  Box, 
  Flex, 
  Image,
  Text,
  Spinner,
  Heading,
  Center,
  VStack 
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Caraousel from '../components/Home/Caraousel'
import Styles from '../styles/Home.module.css'
import { BsFill1CircleFill , BsFill2CircleFill , BsFill3CircleFill ,BsFill5CircleFill ,BsFill4CircleFill , BsFillStarFill } from "react-icons/bs";
import { chakra, shouldForwardProp } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import Joining from '../components/Home/Joining';
import { useAppDispatch } from '../store/Store';
import { useDispatch } from 'react-redux';
import { RESET_ROOM } from '../store/Room/room.actionTypes';


const Home = () => {

  const [loading, setLoading] = useState<boolean>(false)
const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})
const dispatch : useAppDispatch = useDispatch();

//clearing room details when on home page
useEffect(()=>{
  dispatch({type : RESET_ROOM});
},[])


if(loading)
    {
        return (
            <Center minH="80vh" bg="blackAlpha.200" w="full">
                <VStack gap={10}>
                    <Heading fontFamily="Silkscreen, cursive" color="red" size="xl">Joining Room</Heading>
                    <Spinner size="xl" emptyColor="red.400" ringColor='red.900' width="10px" />
                </VStack>
            </Center>
        )
    }

  return (
    <>
    <Flex className={Styles.Main_box} gap={5}>
      <Box w="50%" borderRadius={10}>
      <Box >
      <ChakraBox
      m="auto"
      mt={20}
        animate={{
          scale: [2, 2, 2, 2, 2],
          rotate: [360, 0, 360, 0, 360],
          borderRadius: ["20%", "30%", "50%", "30%", "20%"]
        }}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        padding="2"
        bgGradient="linear(to-r,#290812, #000)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100px"
        height="100px"
        color={"white"}
        fontWeight="bold"
      >
        WELCOME
      </ChakraBox>
      </Box>
      <Box mt="10%">
        <Caraousel />
      </Box>
      </Box>
      <Box  w="60%">
    <Flex w="100%" gap={6} p={3}>
      <Box className={Styles.scale_up_top} bg="blue.900" borderRadius={10} flex={6} mt={"5%"} ml="2%" pl="3%">
        <Text textAlign={"center"} fontSize={30} fontFamily="Silkscreen, cursive"fontWeight="bold" className={Styles.ccc} color="red">Top Scorer</Text>
         {/* one */}
        <Flex mt={"8%"} gap="10%" alignItems={"center"}>
          <Box>
          <BsFillStarFill size={25} color="yellow" className={Styles.rotate_center}/>
          </Box>
          <Box>
            <Text fontSize={25}>Arpit Mishra</Text>
          </Box>
          <Box>
            <BsFill1CircleFill size={25} color="green" />
          </Box>
        </Flex>
         {/* two */}
        <Flex mt={"8%"} gap="10%" alignItems={"center"}>
          <Box>
            <BsFillStarFill size={25} color="yellow" className={Styles.rotate_center}/>
          </Box>
          <Box>
            <Text fontSize={25}>Harshal</Text>
          </Box>
          <Box>
            <BsFill2CircleFill size={25} color="blue"/>
          </Box>
        </Flex>
         {/* three */}
        <Flex mt={"8%"} gap="10%" alignItems={"center"}>
          <Box>
            <BsFillStarFill size={25} color="yellow" className={Styles.rotate_center}/>
          </Box>
          <Box>
            <Text fontSize={25}>Snehil Agrahari</Text>
          </Box>
          <Box>
            <BsFill3CircleFill size={25} color="red"/>
          </Box>
        </Flex>
         {/* four */}
        <Flex mt={"8%"} gap="10%" alignItems={"center"} >
          <Box>
            <BsFill4CircleFill size={25} color="teal" />
          </Box>
          <Box>
            <Text fontSize={25}>Raj Parmar</Text>
          </Box>
          <Box>
            <BsFillStarFill size={25} color="yellow" className={Styles.rotate_center}/>
          </Box>
        </Flex>
        {/* five */}
      </Box>
      <Box flex={4} bg="blue.900" p={3} mt={"5%"} borderRadius={10}>
        <Joining loader={setLoading} />
      </Box>
    </Flex>
    <Box mt={"1%"} p={4}>
      <Image src="https://camo.githubusercontent.com/0850a9b90bf720b08cafe764aea52d8cf2cc7048d4f8080297e8988b76bb08b8/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f7375706572666f6c696f2f696d6167652f75706c6f61642f76313632303638393937392f36383734373437303733336132663266363932653730363936653639366436373265363336663664326636663732363936373639366536313663373332663633333632663333333332663633333232663633333633333333363333323330363536343635333833323636333036353330363336353634333736343335333733303634363236353333363133313636333332653637363936365f796a756832732e676966" borderRadius={10} w={"100%"} h="220px"/>
    </Box>
    </Box>
    </Flex>
    </>
  )
}

export default Home