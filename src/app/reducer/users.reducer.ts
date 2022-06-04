import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { userAction } from 'app/actions';
import { IUser } from 'app/models';

export interface UserState extends EntityState<IUser> {
  selectedUserIds: string[] | undefined;
  selectedUserId: string | undefined;
  length: number
}


// export function selectUserId(a: IUser): string {
//   //In this case this would be optional since primary key is id
//   return a.uuid;
// }

// export function sortByName(a: IUser, b: IUser): number {
//   return a.name.localeCompare(b.name);
// }

export const adapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
  selectId: (a: IUser) => a.uuid,
  sortComparer: (a: IUser, b: IUser) =>
    a.name.localeCompare(b.name)
  ,
});

export const initialState: UserState = adapter.getInitialState({
  selectedUserIds: [],
  selectedUserId: undefined,
  length: 0
})

export const userReducer = createReducer(
  initialState,
  on(userAction.add, (state, { user, size }) => {
    return adapter.addMany([user], state)
  }),
  on(userAction.remove, (state, { userID }) => {
    if ([state.selectedUserId].includes(userID)) {
      return adapter.removeOne(userID, { ...state, selectedUserId: undefined });
    }
    return adapter.removeMany([userID], state)
  }),

  on(userAction.update, (state, { user }) => {
    return adapter.updateOne(user, state)
  }),

  on(userAction.clear, (state) => {
    return adapter.removeAll({ ...state, selectedUserId: undefined, selectedUserIds: undefined });
  }),

  on(userAction.loadUserFromService, (state, { users }) => {
    return adapter.addMany(users, state);
  }),

  on(userAction.selectedUser, (state, { user }) => {
    const currentSelectedUserIds = [...(state.selectedUserIds as string[]), user?.uuid] as string[];
    return { ...state, selectedUserId: user?.uuid, selectedUserIds: [...currentSelectedUserIds] }
  })
);


export const getSelectedUserId = (state: UserState) => state.selectedUserId;

export const getSelectedUserIds = (state: UserState) => state.selectedUserIds;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of user ids
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllUsers = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;
