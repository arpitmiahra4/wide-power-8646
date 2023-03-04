import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Caraousel from '../components/Home/Caraousel'
import Styles from '../styles/Home.module.css'
import { BsFill1CircleFill , BsFill2CircleFill , BsFill3CircleFill ,BsFill5CircleFill ,BsFill4CircleFill , BsFillStarFill } from "react-icons/bs";
import { chakra, shouldForwardProp } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';
import Joining from '../components/Home/Joining';
const Home = () => {
const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})
  return (
    <>
    <Flex borderRadius={10} className={Styles.Main_box} gap="2%">
      <Flex flexDirection={"column"} className={Styles.main_flex} borderRadius={10} w="7%" h="90vh" >
       <Image src='https://i.ibb.co/J5PGkq3/Screenshot-2023-03-04-134136.png' h={"90vh"} borderRadius={10}/>
      </Flex>
      <Box w="50%" borderRadius={10}>
      <Box >
      <ChakraBox
      m="auto"
      mt="10%"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
        padding="2"
        bgGradient="linear(to-l, teal, #d3a7c0)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100px"
        height="100px"
        color={"black"}
        fontWeight="bold"
      >
        Well-Come
      </ChakraBox>
      </Box>
      <Box mt="10%">
        <Caraousel />
      </Box>
      </Box>
    <Flex border={"2px solid red"} w="60%" gap={"3%"}>
      <Box className={Styles.scale_up_top} border={"1px solid yellow"} bg="#1a1c1e" borderRadius={10} w="42%" mt={"5%"} ml="2%" h={"52vh"} pl="3%">
        <Text textAlign={"center"} fontSize={30} fontFamily="cursive"fontWeight="bold" className={Styles.ccc}>Top Scorer</Text>
        <Flex mt={"8%"} gap="10%" alignItems={"center"}>
          <Box>
            <BsFill1CircleFill size={25} color="green" />
          </Box>
          <Box>
            <Text fontSize={25}>Arpit Mishra</Text>
          </Box>
          <Box>
            <BsFillStarFill size={25} color="yellow" className={Styles.rotate_center}/>
          </Box>
        </Flex>
        <Flex mt={"8%"} gap="10%" alignItems={"center"}>
          <Box>
            <BsFill2CircleFill size={25} color="blue"/>
          </Box>
          <Box>
            <Text fontSize={25}>Arpit Mishra</Text>
          </Box>
          <Box>
            <BsFillStarFill size={25} color="yellow" className={Styles.rotate_center}/>
          </Box>
        </Flex>
        <Flex mt={"8%"} gap="10%" alignItems={"center"}>
          <Box>
            <BsFill3CircleFill size={25} color="red"/>
          </Box>
          <Box>
            <Text fontSize={25}>Arpit Mishra</Text>
          </Box>
          <Box>
            <BsFillStarFill size={25} color="yellow" className={Styles.rotate_center}/>
          </Box>
        </Flex>
        <Flex mt={"8%"} gap="10%" alignItems={"center"} >
          <Box>
            <BsFill4CircleFill size={25} color="teal" />
          </Box>
          <Box>
            <Text fontSize={25}>Arpit Mishra</Text>
          </Box>
          <Box>
            <BsFillStarFill size={25} color="yellow" className={Styles.rotate_center}/>
          </Box>
        </Flex>

        <Flex mt={"8%"} gap="10%" alignItems={"center"} >
          <Box>
            <BsFill5CircleFill size={25} color="purple" />
          </Box>
          <Box>
            <Text fontSize={25}>Arpit Mishra</Text>
          </Box>
          <Box>
            <BsFillStarFill size={25} color="yellow" className={Styles.rotate_center}/>
          </Box>
        </Flex>
      </Box>
      <Box w={"50%"} border="2px solid red" h={"52vh"} mt={"5%"} borderRadius={10}>
        <Joining />
      </Box>
    </Flex>
    </Flex>
    </>
  )
}

export default Home