import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import Caraousel from '../components/Home/Caraousel'
import Styles from '../styles/Home.module.css'


const Home = () => {
  return (
    <>
    <Flex borderRadius={10} className={Styles.Main_box} gap="2%">
      <Flex flexDirection={"column"} className={Styles.main_flex} borderRadius={10} w="7%" h="90vh" >
       <Image src='https://i.ibb.co/J5PGkq3/Screenshot-2023-03-04-134136.png' h={"90vh"} borderRadius={10}/>
      </Flex>
      <Box w="50%" borderRadius={10}>
      
        <Caraousel />
      </Box>
    <Box border={"2px solid red"} w="60%">
      <Box border={"1px solid yellow"} bg="#1a1c1e" borderRadius={10} w="42%" mt={"5%"} ml="2%" h={"42vh"} pl="3%">
        <Text textAlign={"center"} fontSize={30} fontFamily="cursive"fontWeight="bold">Top Scorer</Text>
        <Text textAlign={"left"}>arpit</Text>
      </Box>
    </Box>
    </Flex>
    </>
  )
}

export default Home