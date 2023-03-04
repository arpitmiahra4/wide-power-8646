import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Grid, GridItem, Spinner, VStack, Text, Image, Box, Flex } from "@chakra-ui/react";
import styles from '../styles/Lobby.module.css';
import { PlayerDetails } from "../constants/constants";
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

const getUsers = async (id: String): Promise<PlayerDetails[]> => {
    let response: AxiosResponse<any> = await axios.get(`http://localhost:8080/room/singleroom/${id}`);
    return response.data[0].players;
}

const Lobby = () => {

    const [users, setUsers] = useState<PlayerDetails[]>([]);
    // const [time, setTime] = useState<number>(0);
    const intervalId = useRef<any>(null);


    const navigate = useNavigate();

    const id: string = "27a302";

    useEffect(() => {
        intervalId.current = setInterval(() => {
            getUsers(id).then((res) => {
                setUsers(res);
            });
            // setTime((prev: number): number => {
            //     return prev + 3
            // });
        }, 3000);
        return (() => clearInterval(intervalId.current));   
    }, []);


    useEffect(() => {
        if (users.length >= 4) {
            clearInterval(intervalId.current);
            navigate("/");
        }                         
    }, [users]);    

    console.log(users);

    return (
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
    )
}

export default Lobby;