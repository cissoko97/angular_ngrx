import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { IUser } from 'app/models/user.model';


export const loadUser = createAction(`[USER PAGE] load user list`);
export const loadUserSuccess = createAction(`[USER PAGE] load user success`, props<{ users: IUser[] }>());
export const loadUserFailed = createAction(`[USER PAGE] load user failed`);

export const addUser = createAction(`[USER PAGE] add user`, props<{ user: IUser }>());
export const addUserSuccess = createAction(`[USER PAGE] add user succes`, props<{ users: Partial<IUser> }>());
export const addUserFailed = createAction(`[USER PAGE] add user failed`)

export const resetUserList = createAction(`[USER PAGE] reset user list`);
// export const login = createAction(`[${keyWord}] login`, props<{ login: string, password: string }>());
// export const loginSuccess = createAction(`[${keyWord}] login Success`, props<{ login: string, password: string }>());
// export const loginFailed = createAction(`[${keyWord}] login Failed `);
