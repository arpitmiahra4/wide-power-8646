import * as types from './auth.actionTypes';
import { AuthInitialState } from '../../constants/constants';
import { getItem } from '../../utils/localStorage';

const initialState: AuthInitialState = {
    isLoading: false,
    isAuth: getItem('token') ? true : false,
    isError: false,
    token: getItem('token'),
    userDetails: null,
    username: getItem('username') || null,
  };

export const reducer = (
    state: AuthInitialState = initialState,
    {type, payload}: any 
)=>{
    switch(type){
        case types.LOGIN_USER_LOADING:{
            return { ...state, isLoading: true };
        }
        case types.LOGIN_USER_SUCCESS: {
            return {
              ...state,
              isLoading: false,
              isAuth: true,
              userDetails: payload?.user,
              username: payload?.user.username,
            };
          }
          case types.LOGIN_USER_FAILURE: {
            return { ...state, isError: true, isLoading: false };
          }
          case types.GET_USER_DETAILS_LOADING: {
            return { ...state, isLoading: true };
          }
          case types.GET_USER_DETAILS_SUCCESS: {
            return {
              ...state,
              isLoading: false,
              userDetails: payload?.users[0],
              username: payload?.users[0].username,
            };
          }
          case types.GET_USER_DETAILS_FAILURE: {
            return { ...state, isLoading: false, isError: true };
          }
          default:
      return state;
    }
}