import { Box, Button, Center, Circle, Flex, Heading, HStack, Image, Input, Spinner, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import {
  useState,
  useEffect,
  useRef,useCallback
} from 'react'
import {useNavigate} from 'react-router-dom'
import {BiExit} from 'react-icons/bi'
import {GiBurningBook} from 'react-icons/gi'
import {BiTimer} from 'react-icons/bi'
import { useSelector } from 'react-redux'
import {State, RoomType, AuthInitialState} from '../../constants/constants'
import axios from 'axios'
interface wordType{
  word : string,
  displayWord : string,
  hint : string,
  clue1 : string,
  clue2 : string
}



const Round1 = () => {

  const roomDetails = useSelector((store : State) : RoomType=> store.roomManager.data)
  const userDetails = useSelector((store : State)=>store.auth.userDetails)

  const [count, setCount] = useState<number>(5)
  const [count2,setCount2] = useState<number>(30)
  const [loading, setLoading] = useState<boolean>(true);
  const counterRef = useRef<any>(null);
  const counterRef2 = useRef<any>(null); 
  const [clue1, setClue1] = useState<boolean>(false);
  const [clue2, setClue2] = useState<boolean>(false);
  const [roundEnd, setRoundEnd] = useState<boolean>(false);
  const navigate = useNavigate()
  const [score, setScore] = useState<number>(50);
  const [answer, setAnswer] = useState<string>("");
  const [submit,setSubmit] = useState<boolean>(false);
  const [exit, setExit] = useState<boolean>(false);

  const handleDecrement = (val : number)=>{
    setScore(score-val);
  }

  const handleSubmit = async () =>{
    try{
      setSubmit(true);
      const res = await axios.patch(`http://localhost:8080/submitanswer/${roomDetails.roomId}`,{
        user_id : userDetails?._id,
        level : "level1",
        answer,
        score
      })
      console.log(res.data);
    }
    catch(err){
      console.log(err)
    }
  }
  const handleClue1Click = ()=>{
    handleDecrement(10);
    setClue1(true);
  }
  
  const handleClue2Click = () =>{
    handleDecrement(20);
    setClue2(true);
  }
  
  const handleGameTimer = useCallback(() => {
      counterRef2.current = setInterval(()=>{
        setCount2((prev):number=>{
          if(prev>1)
          {
            return prev-1;
          }
          else{
            clearInterval(counterRef2.current);
            setRoundEnd(true);
            setTimeout(()=>{
              navigate('/round2');
            },3000)
            return 0;
          }
        })
      },1000)
    },[])
  
useEffect(()=>{
  counterRef.current = setInterval(()=>{
      setCount((prev):number=>{
        if(prev>1)
          return prev-1;
        else{
          clearInterval(counterRef.current);
          setLoading(false);
          handleGameTimer();
          return 0;
        }
      });
  },1000)

},[handleGameTimer]);


const nav = useNavigate();
const handleExit = ()=>{
  setExit(true);
  if(counterRef.current)
    clearInterval(counterRef.current);
  if(counterRef2.current)
    clearInterval(counterRef2.current);
  setTimeout(()=>{
      nav('/home')
  },2000)
}

  if(roundEnd)
    return (
      <Center minH="80vh">
        <VStack gap={3}>
          <Heading color="white" size="xl" fontFamily="Silkscreen, cursive">Collecting results</Heading>
          <Spinner size="xl" colorScheme="green" />
        </VStack>
      </Center>
    )

  if(exit)
    return (
      <Center minH="80vh">
        <Heading color="white" size="xl" fontFamily="Silkscreen, cursive">Returning to Home Page</Heading>
    </Center>
    )
  

  return loading?(
    <Center minH="80vh">
        <Heading color="white" size="xl" fontFamily="Silkscreen, cursive">Game Starts in {count}</Heading>
    </Center>
  ):(
    <Flex justifyContent="start" w="full" minH="80vh" bg="blackAlpha.700" direction={{base : 'column', sm : 'column', md : 'row'}}>
      <Text fontWeight="bold" size="lg" color="green.800" position="absolute" bottom={0} left="10px">Room ID : {roomDetails.roomId}</Text>
      <Button onClick={handleExit} colorScheme="blue" variant="solid" position="absolute" bottom={4} right="20px"> <BiExit fontSize="20px" /> Exit</Button>
      <Flex direction={{base : 'row', sm: 'row', md : "column" }} justifyContent="center" alignItems="center" flex={2} gap={6}>
        <Heading size="lg" color="white" fontFamily="Silkscreen, cursive">Players : {roomDetails.players?.length}</Heading>
        {
          roomDetails.players?.map((el,i)=>{
            return (
              <Flex gap={2} w="full" alignItems="center" borderBottom="1px solid skyblue" p={"0px 20px"} key={i+1}>
                <Circle maxH="40px" maxW="40px" border="1px solid white" overflow="hidden">
                  <Image src={el.user_avatar} alt={el.username} />
                </Circle>
                <Text fontWeight="bold" fontSize="lg" color="blue.500">{el.username}</Text>
              </Flex>
            )
          })
        }
      </Flex>
      <VStack w="full" border="1px solid white" p={2} flex={8}>
        <VStack w="full" border="2px solid white" p={2} h="full" justifyContent={'space-between'}>
          <HStack w="full" justifyContent="space-between">
            <Text fontSize="2xl" fontFamily="Silkscreen, cursive" color={count2>5?"green":"red"}>TIME REMAINING : 00:{count2<10?`0${count2}`:count2}</Text>
            <Text fontSize="2xl" fontFamily="Silkscreen, cursive" color="white">ROUND-1</Text>
            <Text fontSize="2xl" fontFamily="Silkscreen, cursive" color="red.500">
              Current Score : <Text as="span">{score}</Text>
            </Text>
          </HStack>
          <VStack gap={2} mt={5} w="full">
            <Heading size="2xl" margin="10px" color="yellow.400" fontFamily="heading">{roomDetails.level1?.question}</Heading>
            <Heading size="md" color="green.600">HINT : {roomDetails.level1?.hint}</Heading>
            <Box borderBottom="1px solid green" borderTop="1px solid green" p="10px 20px" w="full">
            {
              clue1?<Heading color="green.600" size="md">CLUE-1 : {roomDetails.level1?.clue1}</Heading>:<Button variant="ghost" colorScheme={'green'} onClick={handleClue1Click}>Show clue</Button>
            }
            </Box>
            <Box borderBottom="1px solid green" borderTop="1px solid green" p="10px 20px" w="full">
            {
              clue2?<Heading color="green.600" size="md">CLUE-2 : {roomDetails.level1?.clue2}</Heading>:<Button colorScheme={'green'} variant="ghost" onClick={handleClue2Click}>Show clue</Button>
            }
            </Box>
          </VStack>
          <VStack>
            {
              submit?(
                <>
                <HStack gap={2}>
                  <GiBurningBook color='blue' size="30px" />
                  <Text color="blue.500">Your answer has been submitted!</Text>
                </HStack>
                <HStack gap={2}>
                  <BiTimer color='blue' size="30px" />
                  <Text color="blue.500"> You current score has been updated by {score}</Text>
                </HStack>
                </>
              ):(
                <>
                <Text mb={-2} color="green.500" fontSize="sm">You can only make one submission in one round.</Text>
                <Input value={answer} onChange={(e)=>setAnswer(e.target.value)}textAlign="center" variant="flushed" type="text" border="1px solid red.500" placeholder="Your Answer" />
                <Button onClick={handleSubmit} variant="outline" colorScheme={'blue'}>Submit</Button>
                </>
              )
            }
          </VStack>
        </VStack>
      </VStack>
    </Flex>
  )

}

export default Round1