import { RoomType } from "../../constants/constants";
import { GET_ROOM_ERROR, GET_ROOM_LOADING, GET_ROOM_SUCCESS, RESET_ROOM } from "./room.actionTypes";

const initRoomState : {data : RoomType|null,loading : boolean, error : boolean}= {
    data : null,
    loading : false,
    error : false
} 

export const reducer = (state : {data : RoomType | null,loading : boolean, error : boolean},{type ,payload} : any)=>{
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