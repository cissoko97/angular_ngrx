import { createReducer, on, } from '@ngrx/store';
import { userAction } from 'app/actions';
import { IUser } from 'app/models/user.model';
export interface UserState {
  users: Array<IUser>,
  length: number;
  selectedUser?: IUser;
}

export const initialState: UserState = {
  users: [],
  length: 0,
};

export const userReducer = createReducer(
  initialState,
  on(userAction.add, (state, { user, size }) => {
    let { users, length, selectedUser } = {
      ...state
    };
    users = [...users, user];
    length = size;
    return { users, length, selectedUser };
  }),
  on(userAction.remove, (state, { userID, size }) => {
    let { users, length, selectedUser } = {
      ...state
    };
    selectedUser = selectedUser?.uuid === userID ? undefined : selectedUser;
    users = users.filter((current: IUser) => current.uuid !== userID);
    length = size;
    return { users, length, selectedUser };
  }),

  on(userAction.update, (state: UserState, { userID, user }) => {
    console.log(state);
    let data = state.users;
    data = data.map((current: IUser) => current.uuid === userID ? user : current);
    return { ...state, users: data };
  }),

  on(userAction.clear, () => {
    return { users: [], length: 0, selectedUser: undefined };
  }),

  on(userAction.getUserApi, (state, { users }) => {
    return { users, length: users.length, selectedUser: undefined };
  }),

  on(userAction.selectedUser, (state, { user }) => {
    let { length, users, selectedUser } = { ...state }
    return { length, users, selectedUser: user };
  })
);
