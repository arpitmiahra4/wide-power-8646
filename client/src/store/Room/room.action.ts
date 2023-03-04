import axios from 'axios';
import {useAppDispatch} from '../Store'
import { GET_ROOM_ERROR, GET_ROOM_LOADING, GET_ROOM_SUCCESS } from './room.actionTypes'

export const getRoomDetails = (roomid : string|undefined)=>async (dispatch : useAppDispatch)=>{
    try{
        dispatch({type : GET_ROOM_LOADING});
        const response = await axios.get(`${process.env['BASE_URL']}/room/singleroom/${roomid}`);
        const data = response.data[0];
        dispatch({type : GET_ROOM_SUCCESS, payload : data});
    }
    catch(err){
        dispatch({error : true});
    }
}

export const createNewRoom = (userid : string|undefined, username : string|undefined)=>async(dispatch : useAppDispatch)=>{
    try{
        dispatch({type : GET_ROOM_LOADING})
        const response = await axios.post(`${process.env['BASE_URL']}/room/create`,{userid,username});
        const {roomid} = response.data;
        dispatch(getRoomDetails(roomid));
    }
    catch(err)
    {
        dispatch({type:  GET_ROOM_ERROR});
    }
}

export const joinNewRoom = (roomid : string|undefined,userid : string|undefined,username : string|undefined)=>async(dispatch:useAppDispatch)=>{
    try{
        dispatch({type : GET_ROOM_LOADING})
        const response = await axios.post(`${process.env['BASE_URL']}/room/join/${roomid}`,{userid,username});
        dispatch(getRoomDetails(roomid));
    }
    catch(err){
        dispatch({type : GET_ROOM_ERROR})
    }
}

export const increasePlayerScore = (roomid : string, player_id : string, username : string, score : number)=>async (dispatch : useAppDispatch)=>{
    try{
        dispatch({type : GET_ROOM_LOADING});
        const response = await axios.patch(`${process.env['BASE_URL']}/room/updatescore/${roomid}`,{
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

export const startRandomGame = (userid: string | undefined, username : string | undefined) => async (dispatch : useAppDispatch)=>{
    try{
        dispatch({type : GET_ROOM_LOADING});
        const response = await axios.patch(`${process.env['BASE_URL']}/room/join`,{
            userid,
            username
        })
        const {roomid} = response.data
        dispatch(getRoomDetails(roomid));
    }
    catch(Err){
        dispatch({type : GET_ROOM_ERROR});
    }
}

export const gameStart = (roomid  :string)=>async (dispatch : useAppDispatch)=>{
    try{
        dispatch({type : GET_ROOM_LOADING});
        const res = await axios.patch(`${process.env['BASE_URL']}/room/gamestart/${roomid}`);
        dispatch(getRoomDetails(roomid));
    }
    catch(err){
        dispatch({type : GET_ROOM_ERROR});
    }
}

export const gameOver = (roomid  :string)=>async (dispatch : useAppDispatch) =>{
    try{
        dispatch({type : GET_ROOM_LOADING})
        const res = await axios.patch(`${process.env['BASE_URL']}/room/gameover/${roomid}`);
        const {leaderboard} = res.data;
        dispatch(getRoomDetails(roomid));
        return leaderboard;
    }
    catch(err){
        dispatch({type : GET_ROOM_ERROR});
    }
}