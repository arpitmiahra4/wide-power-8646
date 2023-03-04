import { Box, Flex, Input, Text } from '@chakra-ui/react'
import React , {useState} from 'react'
import Styles from "../../styles/Home.module.css"
import { BsRocketTakeoffFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import {useAppDispatch} from '../../store/Store'
import { State } from '../../constants/constants';
import { createNewRoom, joinNewRoom, startRandomGame } from '../../store/Room/room.action';
import { useNavigate } from 'react-router-dom';
const Joining = () => {
    const [room,setRoom] = useState<string>("");
    const {userDetails} = useSelector((store:State)=>store.auth);
    const dispatch : useAppDispatch = useDispatch();
    const nav = useNavigate();

  return (
    <>
    <Box>
        <Box mt={"2%"}>
            <Text textAlign={"center"} fontSize={25} className={Styles.ccc} fontFamily="cursive" fontWeight="bold" color="#fb5976">Join Random Room</Text>
            <Flex alignItems={"center"} pl="4%" gap={5} justifyContent="center">
            {/* Give onclick on this Rocket Box */}
            <Box mt={"5%"} borderRadius={"50%"} cursor="pointer" onClick={()=>{dispatch(startRandomGame(userDetails?._id,userDetails?.username));nav('/lobby')}}>
                <BsRocketTakeoffFill size={40} color="#fb5976"/>
            </Box>
            </Flex>
        </Box>
        <Box mt={"5%"}>
            <Text textAlign={"center"} fontSize={25} className={Styles.ccc} fontFamily="cursive" fontWeight="bold" color="red">Join Existing Room</Text>
            <Flex alignItems={"center"} pl="4%" gap={5} justifyContent="center">
            <Input mt={"5%"} w={"80%"} border="2px solid #44d62c" textAlign="center" value={room} onChange={(e)=>setRoom(e.target.value)} color={"red"} fontSize={18} fontWeight="bold" placeholder='Please Enter New Room Id' type="text"/>
            {/* Give onclick on this Rocket Box */}
            <Box mt={"5%"} borderRadius={"50%"} cursor="pointer" onClick={()=>{dispatch(joinNewRoom(room,userDetails?._id,userDetails?.username));nav('/lobby')}}>
                <BsRocketTakeoffFill size={40} color="red"/>
                </Box>
            </Flex>
        </Box>
        <Box mt={"5%"}>
            <Text textAlign={"center"} fontSize={25} className={Styles.ccc} fontFamily="cursive" fontWeight="bold" color="green">Create New Room</Text>
            <Flex alignItems={"center"} pl="4%" gap={5} justifyContent="center">
            {/* Give onclick on this Rocket Box */}
            <Box mt={"5%"} borderRadius={"50%"} cursor="pointer" onClick={()=>{dispatch(createNewRoom(userDetails?._id,userDetails?.username));nav('/lobby')}}>
                <BsRocketTakeoffFill size={40} color="green"/>
                </Box>
            </Flex>
        </Box>
    </Box>
    </>
  )
}

export default Joining