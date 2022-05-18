import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromUser from "app/reducer/users.reducer";

export const selectUsers = createFeatureSelector<fromUser.UserState>('users');

export interface State {
  users: fromUser.UserState;
}

export const reducers: ActionReducerMap<State> = {
  users: fromUser.userReducer,
};

export const selectUserIds = createSelector(
  selectUsers,
  fromUser.selectUserIds // shorthand for usersState => fromUser.selectUserIds(usersState)
);

export const selectUserEntities = createSelector(
  selectUsers,
  fromUser.selectUserEntities
);

export const selectAllUsers = createSelector(
  selectUsers,
  fromUser.selectAllUsers
);

export const selectUserTotal = createSelector(
  selectUsers,
  fromUser.selectUserTotal
);

export const selectCurrentUserId = createSelector(
  selectUsers,
  fromUser.getSelectedUserId
);

export const selectCurrentUserIds = createSelector(
  selectUsers,
  fromUser.getSelectedUserIds
);

export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userId && userEntities[userId]
);

export const selectCurrentUsers = createSelector(
  selectUserEntities,
  selectCurrentUserIds,
  (userEntities, userIds) => userIds && userIds.map(userId => userEntities[userId])
)
