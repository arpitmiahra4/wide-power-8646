import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Grid, GridItem, Spinner, VStack, Text, Image, Box } from "@chakra-ui/react";
import styles from '../styles/Lobby.module.css';
import { PlayerDetails } from "../constants/constants";
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure
} from '@chakra-ui/react'

const getUsers = async (id: String): Promise<PlayerDetails[]> => {
    let response: AxiosResponse<any> = await axios.get(`http://localhost:8080/room/singleroom/${id}`);
    return response.data[0].players;
}

const Lobby = () => {

    const [users, setUsers] = useState<PlayerDetails[]>([]);
    const intervalId = useRef<any>(null);
    const [isAllArrived, setIsAllArrived] = useState<boolean>(false);

    const {onClose } = useDisclosure();



    const navigate = useNavigate();

    const roomManager: any = useSelector((store: any): any => store.roomManager);

    // const id : string = (roomManager.data === null ?  "27a302" : roomManager.data.roomid);

    const id: string = "27a302";

    useEffect(() => {
        intervalId.current = setInterval(() => {
            getUsers(id).then((res) => {
                setUsers(res);
            });
        }, 2000);
        return (() => clearInterval(intervalId.current));
    }, []);


    useEffect(() => {
        if (users.length >= 4) {
            setTimeout(() => {
                clearInterval(intervalId.current);
                setIsAllArrived(true);
                setTimeout(() => {
                    navigate("/round1");
                }, 1000);
            }, 2000);
        }
    }, [users]);


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
                                !users[0] ?
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
                                        <Image className={styles.userImage} src={"/userProfile.png"} alt={users[0].username} />
                                        <Text className={styles.text}>User Name : {users[0].username}</Text>
                                        <Text className={styles.text}>Scores : {users[0].scores || 0}</Text>
                                    </VStack>
                            }
                        </GridItem>
                        <GridItem className={styles.gridItem}>
                            {
                                !users[1] ?
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
                                        <Image className={styles.userImage} src={"/userProfile.png"} alt={users[1].username} />
                                        <Text className={styles.text}>User Name : {users[1].username}</Text>
                                        <Text className={styles.text}>Scores : {users[1].scores || 0}</Text>
                                    </VStack>
                            }
                        </GridItem>
                        <GridItem className={styles.gridItem}>
                            {
                                !users[2] ?
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
                                        <Image className={styles.userImage} src={"/userProfile.png"} alt={users[2].username} />
                                        <Text className={styles.text}>User Name : {users[2].username}</Text>
                                        <Text className={styles.text}>Scores : {users[2].scores || 0}</Text>
                                    </VStack>
                            }
                        </GridItem>
                        <GridItem className={styles.gridItem}>
                            {
                                !users[3] ?
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
                                        <Image className={styles.userImage} src={"/userProfile.png"} alt={users[3].username} />
                                        <Text className={styles.text}>User Name : {users[3].username}</Text>
                                        <Text className={styles.text}>Scores : {users[3].scores || 0}</Text>
                                    </VStack>
                            }
                        </GridItem>
                    </Grid>
            }
        </>
    )
}

export default Lobby;