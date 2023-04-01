export interface UserDetails {
  _id?:string;
  username: string;
  email: string;
  password: string;
  avatar ?: string;
  mobile: Number;
  no_of_wins: Number;
  no_of_looses: Number;
  scores: Number;
}

export interface PlayerDetails {
  username: string;
  email: string;
  password: string;
  mobile: Number;
  no_of_wins: Number;
  no_of_looses: Number;
  scores: number;
}

export type UserCredentials = {
  email: string;
  password: string;
};

export type ReducerProps = {
  type: string;
  payload?: string;
};

export type AuthReducer = {
  type: string;
  payload?: AuthPayload | UserDetail;
};
export interface AuthPayload {
  token?: string;
  message: string;
  user: UserDetails;
}
type UserDetail = {
  message: string;
  users: UserDetails;
};
export type AuthInitialState = {
  isLoading: boolean;
  isError: boolean;
  username: string | null;
  userDetails: UserDetails | null;
  token: string | null;
  isAuth: boolean;
};

export type SignupProps = {
  userDetails: UserDetails;
  existingUsername?: boolean;
  handleOnChange: (e: any) => void;
};
export type State = {
  auth: AuthInitialState;
  roomManager:RoomStateType;
};


export interface playerType{
  user_id: string,
  user_avatar : string,
  username : string,
  score: number,
  time : number,
  _id : string
}

export interface RoomStateType{
  data : RoomType,
  loading : boolean, 
  error : boolean
}

export interface levelType{
  word_id ?: string,
  question  :string,
  word : string,
  hint : string,
  clue1 : string,
  clue2 : string
}

export interface winnerType{
  user_id : string,
  score : number
}
export interface RoomType{
  roomId ?: string,
  room_availability ?: boolean,
  players ?: playerType[],
  level1 ?: levelType,
  level2 ?: levelType,
  level3 ?: levelType,
  level4 ?: levelType,
  winner ?: winnerType,
  game_over ?: boolean,
  created_at ?: Date
}