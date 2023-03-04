import { Center, Heading, HStack, Spinner, Table, Td, Text, Tr, useRadio, VStack } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { playerType } from '../../constants/constants';

const GameOver = () => {
  
    const [loading, setLoading] = useState<boolean>(false);
    const [leaderboard, setLeaderboard] = useState<playerType[]>([
        {
            "user_id": "6400eb96d3055713ed2fb197",
            "username": "mishrajii",
            "score": 0,
            "_id": "6401bfa8c776dfeca3722487"
          },
          {
            "user_id": "6400eb96d3055713ed2fb197",
            "username": "mishrajii",
            "score": 0,
            "_id": "6402fc42c093c701a2fd1599"
          },
          {
            "user_id": "6400c57a0213fd7aef75734b",
            "username": "rajparmar",
            "score": 50,
            "_id": "6402fc8dc093c701a2fd15a6"
          },
          {
            "user_id": "6400c57a0213fd7aef75734b",
            "username": "rajparmar",
            "score": 0,
            "_id": "640300784f23b1875a45f9c5"
          }
    ]);

    const counterRef = useRef<any>(null);
    const [counter, setCounter] = useState<number>(10);
    const [display, setDisplay] = useState<boolean>(true);
    const nav= useNavigate()

    useEffect(()=>{
        counterRef.current = setInterval(()=>{
            setCounter((prev : number) : number=>{
                if(prev>1)
                    return prev-1;
                else
                {
                    clearInterval(counterRef.current);
                    nav('/login');
                    return 0;
                }
            })
        },1000)

        const id = setInterval(()=>{
            setDisplay((prev)=>!prev);
        },500)

        return ()=>{
            clearInterval(id);
        }
    },[])

    

    const position = (i : number)=>{
        switch(i){
            case 0 : return "st";
            case 1 : return "nd";
            case 2 : return "rd";
            case 3 : return "th";
        }
    }

    return loading ?(
      <Center minH="80vh">
        <VStack gap={3}>
          <Heading color="white" size="xl" fontFamily="Silkscreen, cursive">Creating Leaderboard</Heading>
          <Spinner size="xl" colorScheme="green" />
        </VStack>
    </Center>
    ):(
        <Center minH="80vh" background="blackAlpha.700">
            <VStack gap={5}>
                <Heading color="white" size="xl" fontFamily="Silkscreen, cursive">Leaderboard</Heading>
                <Table gap={2}>
                {
                    leaderboard.sort((a,b)=>b.score-a.score).map((el,i)=>{
                        return (
                            <Tr key={i+1}>
                                <Td fontFamily="Silkscreen, cursive" fontSize="lg" color={i==0?'green':'red'}>{i+1}{position(i)}</Td>
                                <Td fontFamily="Silkscreen, cursive" fontSize="lg" color={i==0?'green':'red'}>{el.username}</Td>
                                <Td fontFamily="Silkscreen, cursive" fontSize="lg" color={i==0?'green':'red'}>{el.score}</Td>
                            </Tr>
                        )
                    })
                }
                </Table>
                <Text fontFamily="Silkscreen" visibility={display?'visible':'hidden'} color="yellow">Returning to Main menu in {counter}</Text>
            </VStack>
        </Center>
    )
}

export default GameOver