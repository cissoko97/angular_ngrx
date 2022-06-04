import { createAction, props } from '@ngrx/store';
import { IUser } from 'app/models/user.model';

export const register = createAction(`[AUTHENTICATION] register`, props<{ user: IUser }>());
export const registerSuccess = createAction(`[AUTHENTICATION] register Success`);
export const registerFailed = createAction(`[AUTHENTICATION] register Failed`);
export const login = createAction(`[AUTHENTICATION] login`, props<{ login: string, password: string }>());
export const loginSuccess = createAction(`[AUTHENTICATION] login Success`, props<{ login: string, password: string }>());
export const loginFailed = createAction(`[AUTHENTICATION] login Failed `);
export const logOut = createAction(`[AUTHENTICATION] logout`);
