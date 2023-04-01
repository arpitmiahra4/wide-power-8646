import { Avatar, Box, Button, Center, Circle, Heading, HStack, Image, Spinner, Text, Toast, VStack } from "@chakra-ui/react";
import {useCallback, useEffect, useRef, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PlayerList from "../components/PlayerList";
import { playerType, RoomType, State } from "../constants/constants";
import { gameStart, getRoomDetails } from "../store/Room/room.action";
import { useAppDispatch } from "../store/Store";

const Lobby1 = () =>{

    const [loading,setLoading] = useState<boolean>(false); //joining room status
    const {id} = useParams(); //roomId coming from params 
    const [isFull, setFull] = useState<boolean>(false); // status of number of players
    const [isEligible, setEligible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const dispatchRef = useRef<any>(null); ///multiple api call id
    
    const roomDetails = useSelector((store: State) :RoomType =>store.roomManager.data); //Taking roomDetails from REDUX
    const dispatch : useAppDispatch = useDispatch(); //dispatch function from react-redux
    const nav = useNavigate();  //navigator function

    useEffect(()=>{
        //live-update model
        dispatchRef.current = setInterval(()=>{
            dispatch(getRoomDetails(id));      
        },3000);

        return cleanupDispatchRef;
    },[])

    useEffect(()=>{
        console.log(roomDetails.players)
        if(roomDetails.room_availability===false)
        {
            setFull(true);
            nav('/round1');
        }
        else if(roomDetails.players && roomDetails.players?.length<2)
        {
            setMessage("You need one more player to start the game.")
        }
        else if(roomDetails.players && roomDetails.players?.length>=2)
        {
            setEligible(true);
            setMessage("");
        }
            
    })

    const cleanupDispatchRef = () =>{
        clearInterval(dispatchRef.current);
    }

    const handleStartGameClick= ()=>{
        dispatch(gameStart(id));
    }


    if(loading)
    {
        return (
            <Center minH="80vh" bg="blackAlpha.200" w="full">
                <VStack gap={10}>
                    <Heading fontFamily="Silkscreen, cursive" size="xl">Joining Room</Heading>
                    <Spinner size="xl" colorScheme="white" />
                </VStack>
            </Center>
        )
    }


    return (
        <Center minH="80vh" bg="blackAlpha.200" w="full" position="relative">
            <Center width="full" height="full" bg="#1011119a" display={isFull?'none':'block'} position={'absolute'} top={0} left={0}>
                <VStack gap={10} height="full" width="full" justifyContent="center">
                    <Heading fontFamily="Silkscreen, cursive">
                        Waiting for players
                    </Heading>
                    <Spinner size="xl" colorScheme={'blue'} />
                    <Text fontFamily="Silkscreen, cursive" >{message}</Text> 
                    <Button color="white" onClick={handleStartGameClick} borderRadius={0} bg="red" fontFamily={'Silkscreen, cursive'} display={isEligible?'block':"none"} fontSize="xl" >START GAME</Button>
                </VStack>
                
            </Center>
            <Center width="full" height="full" bg="#1011119a" display={isFull?'block':'none'} position={'absolute'} top={0} left={0}>
                <VStack gap={10} height="full" width="full" justifyContent="center">
                    <Heading fontFamily="Silkscreen, cursive" color="red.500">
                        Taking to Game Page
                    </Heading>
                    <Spinner size="xl" emptyColor="red.400" ringColor='red.900' width="10px" />
                </VStack>
            </Center>
            <VStack gap={10} justifyContent="start" height="full" w="full">
                <Heading size="xl" fontFamily="Silkscreen, cursive">LOBBY</Heading>
                <Heading size="md" fontFamily="Silkscreen, cursive" color="red">ROOM ID : {roomDetails?.roomId}</Heading>
                {
                    roomDetails.players && <PlayerList />
                }
            </VStack>
        </Center>
    )
}

export default Lobby1