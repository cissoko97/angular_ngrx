import { createReducer, on } from "@ngrx/store";
import { keyWord } from "app/utils/storeKey";
import { AuthAction } from './authentication.action';
import { IUser } from "app/models";

export interface AuthState {
  loggedIn: boolean,
  user?: Partial<IUser>
  accessToken?: string,
  refreshToken?: string
}

export interface state {
  readonly [keyWord.AUTHSTORE]: AuthState
}

const authInitialState: AuthState = {
  loggedIn: false,
}

export const authReducer = createReducer(authInitialState,
  on(AuthAction.loginSuccess, (state: AuthState, { accessToken, refreshToken }) => {
    localStorage.setItem(keyWord.USERLOGIN, JSON.stringify({ accessToken, refreshToken }));

    return { ...state, loggedIn: true, accessToken: accessToken, refreshToken: refreshToken };
  }),
  on(AuthAction.loginFailed, (state: AuthState) => {
    return state;
  }),
  on(AuthAction.register, (state: AuthState, { user }) => {
    return state;
  }),
  on(AuthAction.registerSuccess, (state: AuthState, { type }) => {
    return state;
  }),
  on(AuthAction.registerFailed, (state: AuthState, { type }) => {
    return state;
  }),
  on(AuthAction.logOut, (state: AuthState) => {
    localStorage.removeItem(keyWord.USERLOGIN);
    return { ...state, loggedIn: false, user: undefined }
  }));

export * from './authentication.action';
