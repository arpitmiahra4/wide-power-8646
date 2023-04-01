import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Grid, GridItem, Spinner, VStack, Text, Image, Box, Heading, Center } from "@chakra-ui/react";
import styles from '../styles/Lobby.module.css';
import { PlayerDetails, playerType } from "../constants/constants";
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure
} from '@chakra-ui/react'
import { getRoomDetails } from '../store/Room/room.action';
import { useAppDispatch } from '../store/Store';

// const baseUrl = process.env.REACT_APP_BASE_URL;

// const getUsers = async (id: String|undefined): Promise<PlayerDetails[]> => {
//     let response: AxiosResponse<any> = await axios.get(`${baseUrl}/room/singleroom/${id}`);
//     return response.data[0].players;
// 

const Lobby = () => {
    const intervalId = useRef<any>(null);
    const {onClose } = useDisclosure();
    const navigate = useNavigate();
    const roomManager: any = useSelector((store: any): any => store.roomManager);
    const dispatch : useAppDispatch = useDispatch();
    const id : string = roomManager.data?.roomId;
    const loading : boolean = roomManager.loading;
    const players : playerType[] = roomManager.data?.players;
    const [isAllArrived, setIsAllArrived] = useState<boolean>(false);
    
    useEffect(() => {

        dispatch(getRoomDetails(id));

        intervalId.current = setInterval(() => {
            console.log(id);
            dispatch(getRoomDetails(id));
            if(players && players.length==4)
            {
                setIsAllArrived(true);
                setTimeout(()=>{
                    navigate('/round1');
                },1500);
            }
        }, 2000);
        return (() => clearInterval(intervalId.current));
    }, []);

    // if(loading)
    // {
    //     return (
    //         <Center minH="80vh">
    //             <VStack gap={3}>
    //             <Heading color="white" size="xl" fontFamily="Silkscreen, cursive">JOINING ROOM</Heading>
    //             <Spinner size="xl" colorScheme="green" />
    //             </VStack>
    //         </Center>
    //     )
    // }
    return (
        <>
            {

                isAllArrived ?
                    <Modal isOpen={isAllArrived} size={"xl"} onClose={onClose}>
                        <ModalOverlay
                            bg='blackAlpha.300'
                            backdropFilter='blur(10px) hue-rotate(90deg)'
                        />
                        <ModalContent>
                            <ModalBody>
                                <VStack className={styles.flexInsideModal}>
                                    <Spinner
                                        thickness='4px'
                                        speed='0.5s'
                                        // emptyColor='gray.200'
                                        color='white.500'
                                        size='xl'
                                    />
                                    <Text className={styles.text}>You Will Be Redireced To The Game Page.</Text>
                                </VStack>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                    :

                    <Grid className={styles.gridBox} templateColumns='repeat(2, 1fr)' gap={"30px"} >
                        <GridItem className={styles.gridItem}>
                            {
                                !players[0] ?
                                    <Box>
                                        <Spinner
                                            thickness='4px'
                                            speed='0.5s'
                                            // emptyColor='gray.200'
                                            color='white.500'
                                            size='xl'
                                        />
                                        <Text className={styles.text}>Waiting for the user...</Text>
                                    </Box>
                                    :
                                    <VStack className={styles.mainStack}>
                                        <Image className={styles.userImage} src={players[0].user_avatar} alt={players[0].username} />
                                        <Text className={styles.text}>User Name : {players[0].username}</Text>
                                        <Text className={styles.text}>Scores : {players[0].score || 0}</Text>
                                    </VStack>
                            }
                        </GridItem>
                        <GridItem className={styles.gridItem}>
                            {
                                !players[1] ?
                                    <Box>
                                        <Spinner
                                            thickness='4px'
                                            speed='0.5s'
                                            // emptyColor='gray.200'
                                            color='white.500'
                                            size='xl'
                                        />
                                        <Text className={styles.text}>Waiting for the user...</Text>
                                    </Box>

                                    :
                                    <VStack className={styles.mainStack}>
                                        <Image className={styles.userImage} src={players[1].user_avatar} alt={players[1].username} />
                                        <Text className={styles.text}>User Name : {players[1].username}</Text>
                                        <Text className={styles.text}>Scores : {players[1].score || 0}</Text>
                                    </VStack>
                            }
                        </GridItem>
                        <GridItem className={styles.gridItem}>
                            {
                                !players[2] ?
                                    <Box>
                                        <Spinner
                                            thickness='4px'
                                            speed='0.5s'
                                            // emptyColor='gray.200'
                                            color='white.500'
                                            size='xl'
                                        />
                                        <Text className={styles.text}>Waiting for the user...</Text>
                                    </Box>

                                    :
                                    <VStack className={styles.mainStack}>
                                        <Image className={styles.userImage} src={players[2].user_avatar} alt={players[2].username} />
                                        <Text className={styles.text}>User Name : {players[2].username}</Text>
                                        <Text className={styles.text}>Scores : {players[2].score || 0}</Text>
                                    </VStack>
                            }
                        </GridItem>
                        <GridItem className={styles.gridItem}>
                            {
                                !players[3] ?
                                    <VStack className={styles.spinnerBox}>
                                        <Spinner
                                            thickness='4px'
                                            speed='0.5s'
                                            // emptyColor='gray.200'
                                            color='white.500'
                                            size='xl'
                                        />
                                        <Text className={styles.text}>Waiting for the user...</Text>
                                    </VStack>
                                    :
                                    <VStack className={styles.mainStack}>
                                        <Image className={styles.userImage} src={players[3].user_avatar} alt={players[3].username} />
                                        <Text className={styles.text}>User Name : {players[3].username}</Text>
                                        <Text className={styles.text}>Scores : {players[3].score || 0}</Text>
                                    </VStack>
                            }
                        </GridItem>
                    </Grid>
            }
        </>
    )
}

export default Lobby;