import { Dictionary } from "@ngrx/entity";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { IUser } from "app/models";
import { keyWord } from "app/utils/storeKey";
import { getInProggress, getLength } from ".";
import { userReducer, UserState, getSelectedUserId, selectAll, selectEntities, selectTotal } from "./users.reducer";

export const selectUserStore = createFeatureSelector<UserState>(keyWord.USERSTORE);

export interface State {
  users: UserState;
}

export const reducers: ActionReducerMap<State> = {
  users: userReducer,
};

export const selectUserEntities = createSelector(
  selectUserStore,
  selectEntities
);

export const selectAllUsers = createSelector(
  selectUserStore,
  selectAll
);

export const selectUserTotal = createSelector(
  selectUserStore,
  selectTotal
);

export const selectCurrentUserId = createSelector(
  selectUserStore,
  getSelectedUserId
);

export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userId && userEntities[userId]
);

export const selectInProggress = createSelector(
  selectUserStore,
  getInProggress
)

export const selectUserById = (props: { uuid: string }) => createSelector(
  selectUserEntities,
  (userEntities: Dictionary<IUser>) => props.uuid && userEntities[props.uuid]
);
