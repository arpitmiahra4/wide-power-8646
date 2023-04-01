import axios, { AxiosResponse } from 'axios';
import {useAppDispatch} from '../Store'
import { GET_ROOM_ERROR, GET_ROOM_LOADING, GET_ROOM_SUCCESS } from './room.actionTypes';

const BASE_URL = process.env.BASE_URL;


//GET ROOM DETAILS
export const getRoomDetails = (roomId : string|undefined) : any=>async (dispatch : useAppDispatch)=>{
    try{
        dispatch({type : GET_ROOM_LOADING});
        const response = await axios.get(`http://localhost:8080/room/singleroom/${roomId}`);
        const data = response.data[0];
        dispatch({type : GET_ROOM_SUCCESS, payload : data});
        return data;
    }
    catch(err){
        dispatch({type : GET_ROOM_ERROR});
    }
}
//CREATE ROOM
export const createNewRoom = async (user_id : string|undefined, username : string|undefined, user_avatar : string|undefined, dispatch : useAppDispatch)=>{
    try{
        dispatch({type : GET_ROOM_LOADING})
        const response = await axios.post(`http://localhost:8080/room/create`,{
            user_id,
            username,
            user_avatar
        });
        const {roomId} = response.data;
        console.log(response.data);
        dispatch(getRoomDetails(roomId));
        return roomId;
    }
    catch(err)
    {
        dispatch({type:  GET_ROOM_ERROR});
    }
}

//JOIN ROOM
export const joinNewRoom = async (roomId : string | undefined, user_id : string | undefined, username : string | undefined, user_avatar : string | undefined, dispatch : useAppDispatch)=>{
    try{
        dispatch({type : GET_ROOM_LOADING});
        const response = await axios.patch(`http://localhost:8080/room/join/${roomId}`,{
            user_id,
            user_avatar,
            username
        });
        dispatch(getRoomDetails(roomId));
        console.log(response.data);
        return roomId;
    }
    catch(err){
        console.log(err)
        dispatch({type : GET_ROOM_ERROR});
    }
}

//INCREASE PLAYER SCORE
export const increasePlayerScore = (roomid : string, player_id : string, username : string, score : number)=>async (dispatch : useAppDispatch)=>{
    try{
        dispatch({type : GET_ROOM_LOADING});
        const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/room/updatescore/${roomid}`,{
            player_id,
            username,
            score
        });
        dispatch(getRoomDetails(roomid));
    }
    catch(err){
        dispatch({type : GET_ROOM_ERROR});
    }
}

//RANDOM GAME
export const startRandomGame = async (user_id : string | undefined, user_avatar : string | undefined, username : string | undefined, dispatch : useAppDispatch)=>{
    try{
        dispatch({type : GET_ROOM_LOADING});
        const res = await axios.patch(`http://localhost:8080/room/join`,{
            user_id,
            username,
            user_avatar
        });
        const {roomId} = res.data;
        dispatch(getRoomDetails(roomId));
        return roomId;
    }
    catch(err){
        console.log(err);
    }
}

//GAME START
export const gameStart = (roomId  :string | undefined)=>async (dispatch : useAppDispatch)=>{
    try{
        dispatch({type : GET_ROOM_LOADING});
        const res = await axios.patch(`http://localhost:8080/room/gamestart/${roomId}`);
        console.log(res);
        dispatch(getRoomDetails(roomId));
    }
    catch(err){
        dispatch({type : GET_ROOM_ERROR});
    }
}

//GAME END
export const gameOver = (roomId  :string | undefined)=>async (dispatch : useAppDispatch) =>{
    try{
        dispatch({type : GET_ROOM_LOADING})
        const res = await axios.patch(`${process.env.REACT_APP_BASE_URL}/room/gameover/${roomId}`);
        const {leaderboard} = res.data;
        dispatch(getRoomDetails(roomId));
        return leaderboard;
    }
    catch(err){
        dispatch({type : GET_ROOM_ERROR});
    }
}