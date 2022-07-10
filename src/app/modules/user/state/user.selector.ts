import { Dictionary } from "@ngrx/entity";
import { ActionReducerMap, createFeatureSelector, createSelector, props } from "@ngrx/store";
import { IUser } from "app/models";
import { keyWord } from "app/utils/storeKey";
import { getInProggress } from ".";
import { userReducer, UserState, getSelectedUserId, selectAll, selectIds, selectEntities, selectTotal } from "./users.reducer";

export const selectUsers = createFeatureSelector<UserState>(keyWord.USERSTORE);

export interface State {
  users: UserState;
}

export const reducers: ActionReducerMap<State> = {
  users: userReducer,
};

export const selectUserEntities = createSelector(
  selectUsers,
  selectEntities
);

export const selectAllUsers = createSelector(
  selectUsers,
  selectAll
);

export const selectUserTotal = createSelector(
  selectUsers,
  selectTotal
);

export const selectCurrentUserId = createSelector(
  selectUsers,
  getSelectedUserId
);

export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userId && userEntities[userId]
);

export const selectInProggress = createSelector(
  selectUsers,
  getInProggress
)

export const selectUserById = (props: { uuid: string }) => createSelector(
  selectUserEntities,
  (userEntities: Dictionary<IUser>) => props.uuid && userEntities[props.uuid]
);
