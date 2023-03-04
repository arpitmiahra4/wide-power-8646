import { Box, Flex, Input, Text } from '@chakra-ui/react'
import React from 'react'
import Styles from "../../styles/Home.module.css"
import { BsRocketTakeoffFill } from "react-icons/bs";
const Joining = () => {
  return (
    <>
    <Box>
        <Box mt={"2%"}>
            <Text textAlign={"center"} fontSize={25} className={Styles.ccc} fontFamily="cursive" fontWeight="bold" color="#fb5976">Join Random Room</Text>
            <Flex alignItems={"center"} pl="4%" gap={5}>
            <Input mt={"5%"} w={"80%"} border="2px solid #44d62c" textAlign="center" color={"red"} fontSize={18} fontWeight="bold" placeholder='Please Enter Room Id' type="text"/>
            {/* Give onclick on this Rocket Box */}
            <Box mt={"5%"} borderRadius={"50%"}>
                <BsRocketTakeoffFill size={40} color="#fb5976"/>
                </Box>
            </Flex>
        </Box>
        <Box mt={"2%"}>
            <Text textAlign={"center"} fontSize={25} className={Styles.ccc} fontFamily="cursive" fontWeight="bold" color="red">Join Existing Room</Text>
            <Flex alignItems={"center"} pl="4%" gap={5}>
            <Input mt={"5%"} w={"80%"} border="2px solid #44d62c" textAlign="center" color={"red"} fontSize={18} fontWeight="bold" placeholder='Please Enter Room Id' type="text"/>
            {/* Give onclick on this Rocket Box */}
            <Box mt={"5%"} borderRadius={"50%"}>
                <BsRocketTakeoffFill size={40} color="red"/>
                </Box>
            </Flex>
        </Box>
        <Box mt={"2%"}>
            <Text textAlign={"center"} fontSize={25} className={Styles.ccc} fontFamily="cursive" fontWeight="bold" color="green">Create New Room</Text>
            <Flex alignItems={"center"} pl="4%" gap={5}>
            <Input mt={"5%"} w={"80%"} border="2px solid #44d62c" textAlign="center" color={"red"} fontSize={18} fontWeight="bold" placeholder='Please Enter New Room Id' type="text"/>
            {/* Give onclick on this Rocket Box */}
            <Box mt={"5%"} borderRadius={"50%"}>
                <BsRocketTakeoffFill size={40} color="green"/>
                </Box>
            </Flex>
        </Box>
    </Box>
    </>
  )
}

export default Joining