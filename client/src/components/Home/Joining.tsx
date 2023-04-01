import { 
    Box, 
    Flex, 
    Input, 
    Text,
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    VStack,
    Button,
    Spinner,
    Heading,
    Center
} from '@chakra-ui/react'
import React , {useState, useRef, Dispatch, SetStateAction} from 'react'
import Styles from "../../styles/Home.module.css"
import { BsRocketTakeoffFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import {useAppDispatch} from '../../store/Store'
import { State } from '../../constants/constants';
import { createNewRoom, joinNewRoom, startRandomGame } from '../../store/Room/room.action';
import { useNavigate } from 'react-router-dom';
const Joining = (props : {loader : Dispatch<SetStateAction<boolean>>}) => {
    const [room,setRoom] = useState<string>("");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef<any>(null);
    const {userDetails} = useSelector((store:State)=>store.auth);
    const dispatch : useAppDispatch = useDispatch();
    const nav = useNavigate();


    const handleRandomGameClick = async () =>{
        try{
            props.loader(true);
            const roomId = await startRandomGame(userDetails?._id, userDetails?.avatar, userDetails?.username, dispatch);
            nav(`/lobby1/${roomId}`);
        }
        catch(err)
        {
            nav('/home');
        }
    }

    const handleCreateRoomClick = async()=>{
        try{
            props.loader(true);
            const roomId = await createNewRoom(userDetails?._id, userDetails?.username, userDetails?.avatar, dispatch);
            nav(`/lobby1/${roomId}`);
        }
        catch(err)
        {
            nav('/home');
        }
    }

    const handleJoinRoomClick = async()=>{
        try{
            props.loader(true);
            const roomId = room;
            setRoom("");
            await joinNewRoom(roomId , userDetails?._id, userDetails?.username, userDetails?.avatar, dispatch);
            nav(`/lobby1/${roomId}`);
        }
        catch(err)
        {
            nav('/home');
        }
    }

    


  return (
    <>
    <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef = {cancelRef}
        colorScheme="blackAlpha"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>

            <AlertDialogBody p={5}>
            <AlertDialogCloseButton />
              <VStack w="full" gap={2}>
                <Text fontFamily="Silkscreen, cursive" fontWeight="bold"  color="#44d62c" fontSize="2xl">
                    Enter room ID
                </Text>
                <Input mt={"5%"} w={"80%"} fontFamily="Silkscreen, cursive" cursor="pointer" border="2px solid #44d62c" textAlign="center" value={room} onChange={(e)=>setRoom(e.target.value)} color={"red"} fontSize={18} fontWeight="bold" placeholder='ROOM ID' type="text"/>
                <Button visibility={room.length==6?'visible':'hidden'} onClick={handleJoinRoomClick} borderRadius={0} background="#44d62c" fontFamily="Silkscreen, cursive" color="black" p={2}>JOIN</Button> 
              </VStack>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    <Box>
        <Box mt={"2%"}>
            <Text textAlign={"center"} fontSize={25} fontFamily="Silkscreen, cursive" fontWeight="bold" color="yellow">Start Game</Text>
            <Flex alignItems={"center"} pl="4%" gap={5} justifyContent="center">
            {/* Give onclick on this Rocket Box */}
            <Box mt={"5%"} borderRadius={"50%"} cursor="pointer" onClick={handleRandomGameClick}>
                <BsRocketTakeoffFill size={40} color="yellow"/>
            </Box>
            </Flex>
        </Box>
        <Box mt={"5%"}>
            <Text textAlign={"center"} fontSize={25} fontFamily="Silkscreen, cursive" fontWeight="bold" color="red">Join Room</Text>
            <Flex alignItems={"center"} pl="4%" gap={5} justifyContent="center">
            {/* Give onclick on this Rocket Box */}
            <Box mt={"5%"} borderRadius={"50%"} cursor="pointer" onClick={onOpen}>
                <BsRocketTakeoffFill size={40} color="red"/>
                </Box>
            </Flex>
        </Box>
        <Box mt={"5%"}>
            <Text textAlign={"center"} fontSize={25} fontFamily="Silkscreen, cursive" fontWeight="bold" color="green">Create Room</Text>
            <Flex alignItems={"center"} pl="4%" gap={5} justifyContent="center">
            {/* Give onclick on this Rocket Box */}
            <Box mt={"5%"} borderRadius={"50%"} cursor="pointer" onClick={handleCreateRoomClick}>
                <BsRocketTakeoffFill size={40} color="green"/>
                </Box>
            </Flex>
        </Box>
    </Box>
    </>
  )
}

export default Joining