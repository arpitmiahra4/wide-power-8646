export interface UserDetails {
  username: string;
  email: string;
  password: string;
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
};

// const roomsSchema = mongoose.Schema({
//   roomid: { type: String, required: true },
 
//   room_availability: { type: Boolean, default: true },
//   players: [
//     {
//       user_id: { type: String, required: true },
//       username:{ type: String, required: true },
//       score:{ type: Number,default: 0}
//     }
//   ],
//   level1:{
//     word_id:String,
//     question:String,
//     word:String,
//     hint:String,
//     clue1:String,
//     clue2:String
//   },
//   level2:{
//     word_id:String,
//     question:String,
//     word:String,
//     hint:String,
//     clue1:String,
//     clue2:String
//   },
//   level3:{
//     word_id:String,
//     question:String,
//     word:String,
//     hint:String,
//     clue1:String,
//     clue2:String
//   },
//   level4:{
//     word_id:String,
//     question:String,
//     word:String,
//     hint:String,
//     clue1:String,
//     clue2:String
//   },

//   winner: {
//     user_id: String,
//     winning_score: Number,
//   },
//   game_over: { type: Boolean, default: false },
//   created_at: { type: Date, required: true },
// });

export interface playerType{
  user_id: string,
  username : string,
  score: number,
  _id : string
}

export interface levelType{
  word_id : string,
  question  :string,
  word : string,
  hint : string,
  clue1 : string,
  clue2 : string
}

export interface winnerType{
  user_id : string,
  winning_score : number
}
export interface RoomType{
  roomid : string,
  room_availability : boolean,
  players : playerType[],
  level1 : levelType,
  level2 : levelType,
  level3 : levelType,
  level4 : levelType,
  winner : winnerType,
  game_over : boolean,
  created_at : Date
}