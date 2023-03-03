import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Grid, GridItem, Spinner, VStack, Text, Image, Box, Flex } from "@chakra-ui/react";
import styles from '../styles/Lobby.module.css';
import { PlayerDetails } from "../constants/constants";
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const getUsers = async (id: String): Promise<PlayerDetails[]> => {
    let response: AxiosResponse<PlayerDetails[]> = await axios.get(`http://localhost:8080/room/getplayerlist/${id}`);
    return response.data;
}

const Lobby = () => {

    const [users, setUsers] = useState<PlayerDetails[]>([{
        username: "rajparmar",
        email: "rajparmar123@gmail.com",
        mobile: 1234567890,
        password: "rajparmar123",
        no_of_wins: 0,
        no_of_looses: 0,
        scores: 0
    }, {
        username: "rajparmar",
        email: "rajparmar123@gmail.com",
        mobile: 1234567890,
        password: "rajparmar123",
        no_of_wins: 0,
        no_of_looses: 0,
        scores: 0
    }, {
        username: "rajparmar",
        email: "rajparmar123@gmail.com",
        mobile: 1234567890,
        password: "rajparmar123",
        no_of_wins: 0,
        no_of_looses: 0,
        scores: 0
    }]);
    const [time, setTime] = useState<number>(0);
    const intervalId = useRef<any>(null);
   

    const navigate = useNavigate();

    const id: string = "1";

    useEffect(() => {
        intervalId.current  = setInterval(() => {
            // getUsers(id).then((res) => {
            //     setUsers(res);
            // });
            setTime((prev : number) : number => {
                return prev + 3
            });
        }, 3000);
    }, []);
    

    useEffect(() => {
        if (time >= 30) {
            clearInterval(intervalId.current);
            navigate("/");
        }
    } , [time]);

    return (
        <Grid className={styles.gridBox} templateColumns='repeat(2, 1fr)' gap={6} >
            <GridItem className={styles.gridItem}>
                {
                    !users[0] ?
                        <Box>
                            <Spinner
                                thickness='4px'
                                speed='0.5s'
                                emptyColor='gray.200'
                                color='white.500'
                                size='xl'
                            />
                        </Box>
                        :
                        <VStack className={styles.mainStack}>
                            <Image className={styles.userImage} src={"/userProfile.png"} alt={users[0].username} />
                            <Text className={styles.text}>User Name : {users[0].username}</Text>
                            <Text className={styles.text}>Scores : {users[0].scores}</Text>
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
                                emptyColor='gray.200'
                                color='white.500'
                                size='xl'
                            />
                        </Box>
                        :
                        <VStack className={styles.mainStack}>
                            <Image className={styles.userImage} src={"/userProfile.png"} alt={users[1].username} />
                            <Text className={styles.text}>User Name : {users[1].username}</Text>
                            <Text className={styles.text}>Scores : {users[1].scores}</Text>
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
                                emptyColor='gray.200'
                                color='white.500'
                                size='xl'
                            />
                        </Box>
                        :
                        <VStack className={styles.mainStack}>
                            <Image className={styles.userImage} src={"/userProfile.png"} alt={users[2].username} />
                            <Text className={styles.text}>User Name : {users[2].username}</Text>
                            <Text className={styles.text}>Scores : {users[2].scores}</Text>
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
                                emptyColor='gray.200'
                                color='white.500'
                                size='xl'
                            />
                            <Text className={styles.text}>Waiting for the user...</Text>
                        </VStack>
                        :
                        <VStack className={styles.mainStack}>
                            <Image className={styles.userImage} src={"/userProfile.png"} alt={users[3].username} />
                            <Text className={styles.text}>User Name : {users[3].username}</Text>
                            <Text className={styles.text}>Scores : {users[3].scores}</Text>
                        </VStack>
                }
            </GridItem>
        </Grid>
    )
}

export default Lobby;