import { createAction, props } from '@ngrx/store';
import { IUser } from 'app/models/user.model';

const keyWord = 'USER';


export const add = createAction(`${keyWord} Add`, props<{ user: IUser, size: number }>());
export const remove = createAction(`${keyWord} remove`, props<{ userID: string, size: number }>());
export const update = createAction(`${keyWord} update`, props<{ userID: string, user: IUser }>());
export const clear = createAction(`${keyWord} clear`);
export const getUserApi = createAction(`${keyWord} fetch from API`, props<{ users: Array<IUser> }>())
export const selectedUser = createAction(`${keyWord} selected`, props<{ user?: IUser }>())
