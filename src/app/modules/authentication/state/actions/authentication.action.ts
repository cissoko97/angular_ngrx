import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { IUser } from 'app/models/user.model';

const keyWord = 'AUTHENTICATION';

export const register = createAction(`[${keyWord}] register`, props<{ user: IUser }>());
export const registerSuccess = createAction(`[${keyWord}] register Success`);
export const registerFailed = createAction(`[${keyWord}] register Failed`);
export const login = createAction(`[${keyWord}] login`, props<{ login: string, password: string }>());
export const loginSuccess = createAction(`[${keyWord}] login Success`, props<{ login: string, password: string }>());
export const loginFailed = createAction(`[${keyWord}] login Failed `);
