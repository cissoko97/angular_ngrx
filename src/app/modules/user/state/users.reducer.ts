import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IUser } from 'app/models';
import { userActions } from '.';


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

export const getSelectedUserId = (state: UserState) => state.selectedUserId;

export const getInProggress = (state: UserState) => state.inProggress;


export const getLength = (state: UserState) => state.length;
// export const getSelectedUserIds = (state: UserState) => state.selectedUserIds;

// get the selectors
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
