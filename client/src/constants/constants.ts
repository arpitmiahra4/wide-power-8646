export interface UserDetails {
  username: string;
  email: string;
  password: string;
  mobile: Number;
  no_of_wins: Number;
  no_of_looses: Number;
  scores: Number;
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
