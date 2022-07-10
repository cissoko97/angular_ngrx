import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
// import { userAction } from 'app/actions';
import { IUser } from 'app/models';
import { userAction } from '.';


export interface UserState extends EntityState<IUser> {
  inProggress: boolean
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

  on(userAction.loadUser, (state) => {
    return { ...state, inProggress: true }
  }),
  on(userAction.loadUserSuccess, (state, { users }) => {
    return adapter.addMany(users, { ...state });
  }),

  on(userAction.loadUserFailed, (state) => {
    return { ...state }
  }),

  on(userAction.resetUserList, (state) => {
    return adapter.removeAll(state);
  }),

  on(userAction.addUser, (state, { user }) => {
    return adapter.addMany([user], state);
  })

  // on(userAction.remove, (state, { userID }) => {
  //   if ([state.selectedUserId].includes(userID)) {
  //     return adapter.removeOne(userID, { ...state, selectedUserId: undefined });
  //   }
  //   return adapter.removeMany([userID], state)
  // }),

  // on(userAction.update, (state, { user }) => {
  //   return adapter.updateOne(user, state)
  // }),

  // on(userAction.clear, (state) => {
  //   return adapter.removeAll({ ...state, selectedUserId: undefined, selectedUserIds: undefined });
  // }),


  // on(userAction.selectedUser, (state, { user }) => {
  //   // const currentSelectedUserIds = [...(state.selectedUserIds as string[]), user?.uuid] as string[];
  //   return { ...state, selectedUserId: user?.uuid }
  // })
);


export const getSelectedUserId = (state: UserState) => state.selectedUserId;
export const getInProggress = (state: UserState) => state.inProggress;

// export const getSelectedUserIds = (state: UserState) => state.selectedUserIds;

// get the selectors
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
