import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { IUser } from 'app/models/user.model';
import { UserState } from 'app/reducer/users.reducer';

const keyWord = 'USER';


export const add = createAction(`${keyWord} Add`, props<{ user: IUser, size: number }>());
export const remove = createAction(`${keyWord} remove`, props<{ userID: string }>());
export const update = createAction(`${keyWord} update`, props<{ user: Update<IUser> }>());
export const clear = createAction(`${keyWord} clear`);
export const getUserApi = createAction(`${keyWord} fetch from API`)
export const loadUserFromService = createAction(`${keyWord} LoadUserFromService`, props<{ users: Array<IUser> }>())
export const selectedUser = createAction(`${keyWord} selected`, props<{ user?: IUser }>())

export const hydrate = createAction(`[HYDRATE]`);
export const hydrateSuccess = createAction(`[HYDRATE SUCCES]`, props<{ state: UserState }>());
export const hydrateFailure = createAction(`[HYDRATE FAILURE]`);
