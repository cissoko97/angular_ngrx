import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import { IUser } from 'app/models';
import { keyWord } from 'app/utils/storeKey';
import { environment } from 'environments/environment';
import { userActions } from '.';

export interface State {
  readonly [keyWord.USERSTORE]: UserState
}

export interface UserState extends EntityState<IUser> {
  inProggress: boolean;
  selectedUserId: string | undefined;
  length: number
}

export function selectUserId(a: IUser): string {
  //In this case this would be optional since primary key is id
  return a.uuid;
}

export function sortByName(a: IUser, b: IUser): number {
  return a.uuid.localeCompare(b.uuid);
}

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
  selectId: selectUserId,
  sortComparer: sortByName,
});

export const initialState: UserState = adapter.getInitialState({
  inProggress: false,
  selectedUserId: undefined,
  length: 0
})

export const userReducer = createReducer(
  initialState,

  on(userActions.loadUser, (state) => {
    return { ...state, inProggress: true }
  }),
  on(userActions.loadUserSuccess, (state, { users }) => {
    return adapter.addMany(users, { ...state, inProggress: false });
  }),

  on(userActions.loadUserFailed, (state) => {
    return { ...state }
  }),

  on(userActions.resetUserList, (state) => {
    return adapter.removeAll(state);
  }),

  on(userActions.addUser, (state, { user }) => {
    return adapter.addMany([user], state);
  })

);



export function logger(reducer: ActionReducer<UserState>): ActionReducer<UserState> {
  return function (state, action): UserState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<UserState>[] = !environment.production
  ? [logger]
  : [];
