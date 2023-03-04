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
      <Box  w="60%">
    <Flex w="100%" gap={"3%"}>
      <Box className={Styles.scale_up_top} bg="#1a1c1e" borderRadius={10} w="42%" mt={"5%"} ml="2%" h={"52vh"} pl="3%">
        <Text textAlign={"center"} fontSize={30} fontFamily="cursive"fontWeight="bold" className={Styles.ccc}>Top Scorer</Text>
         {/* one */}
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
         {/* two */}
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
         {/* three */}
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
         {/* four */}
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
        {/* five */}
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
      <Box w={"50%"} className={Styles.scale_up_top} bg="#1a1c1e" h={"52vh"} mt={"5%"} borderRadius={10}>
        <Joining />
      </Box>
    </Flex>
    <Box mt={"1%"} pl="2%">
      <Image src="https://camo.githubusercontent.com/0850a9b90bf720b08cafe764aea52d8cf2cc7048d4f8080297e8988b76bb08b8/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f7375706572666f6c696f2f696d6167652f75706c6f61642f76313632303638393937392f36383734373437303733336132663266363932653730363936653639366436373265363336663664326636663732363936373639366536313663373332663633333632663333333332663633333232663633333633333333363333323330363536343635333833323636333036353330363336353634333736343335333733303634363236353333363133313636333332653637363936365f796a756832732e676966" borderRadius={10} w={"100%"} h="220px"/>
    </Box>
    </Box>
    </Flex>
    </>
  )
}

export default Home