import { RoomStateType, RoomType } from "../../constants/constants";
import { GET_ROOM_ERROR, GET_ROOM_LOADING, GET_ROOM_SUCCESS, RESET_ROOM } from "./room.actionTypes";

const initRoomState : {data : RoomType,loading : boolean, error : boolean}= {
    data : {},
    loading : false,
    error : false
} 

export const roomReducer = (state : RoomStateType = initRoomState,{type ,payload} : any)=>{
    switch(type){
        case GET_ROOM_LOADING : {
            return {
                ...state,
                loading : true,
                error : false
            }
        }
        case GET_ROOM_ERROR : {
            return {
                ...state,
                loading : false,
                error: true
            }
        }
        case GET_ROOM_SUCCESS : {
            return {
                data : payload,
                loading : false,
                error : false
            }
        }
        case RESET_ROOM : {
            return {
                ...initRoomState
            }
        }
        default : return state
    }
}