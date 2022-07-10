import { createReducer, on } from "@ngrx/store";
import { keyWord } from "app/utils/storeKey";
import { AuthAction } from './authentication.action';
import { AuthState } from "./model";


const authInitialState: AuthState = {
  loggedIn: false
}

export const authReducer = createReducer(authInitialState,
  on(AuthAction.loginSuccess, (state: AuthState, { login, password }) => {
    localStorage.setItem(keyWord.USERLOGIN, JSON.stringify({ login, password }));
    return { ...state, loggedIn: true, user: { name: login } };
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
