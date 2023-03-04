import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import Styles from '../styles/Home.module.css'


const Home = () => {
  return (
    <Box borderRadius={10} className={Styles.Main_box}>
      <Flex flexDirection={"column"} className={Styles.main_flex} borderRadius={10} w="7%" h="90vh" >
       <Image src='https://i.ibb.co/J5PGkq3/Screenshot-2023-03-04-134136.png' h={"90vh"} borderRadius={10}/>
      </Flex>
    </Box>
  )
}

export default Home