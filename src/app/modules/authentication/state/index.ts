import { createReducer, on } from "@ngrx/store";
import * as authenticationAction from './authentication.action';
import { AuthState } from "./model";


const authInitialState: AuthState = {
  loggedIn: false
}

export const authReducer = createReducer(authInitialState,
  on(authenticationAction.loginSuccess, (state: AuthState, { login, password }) => {
    localStorage.setItem('loggedIn', JSON.stringify({ login, password }));
    return { ...state, loggedIn: true, user: { name: login } };
  }),
  on(authenticationAction.loginFailed, (state: AuthState) => {
    return state;
  }),
  on(authenticationAction.register, (state: AuthState, { user }) => {
    return state;
  }),
  on(authenticationAction.registerSuccess, (state: AuthState, { type }) => {
    return state;
  }),
  on(authenticationAction.registerFailed, (state: AuthState, { type }) => {
    return state;
  }),
  on(authenticationAction.logOut, (state: AuthState) => {
    localStorage.removeItem('loggedIn');
    return { ...state, loggedIn: false, user: undefined }
  }));

export * as authenticationAction from './authentication.action';
