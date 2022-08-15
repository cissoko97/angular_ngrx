import { Dictionary } from "@ngrx/entity";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { IUser } from "app/models";
import { keyWord } from "app/utils/storeKey";
import { UserState, adapter, userReducer } from "./users.reducer";

/**
 *
*/
export const selectUserStore = createFeatureSelector<UserState>(keyWord.USERSTORE);

/**
 *
*/
export const getSelectedUserId = (state: UserState) => state.selectedUserId;

/**
 *
*/
export const getInProggress = (state: UserState) => state.inProggress;

/**
 *
*/
export const getLength = (state: UserState) => state.length;

// get the selectors from adapter
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();


interface State {
  readonly [keyWord.USERSTORE]: UserState;
}

export const reducers: ActionReducerMap<State> = {
  [keyWord.USERSTORE]: userReducer,
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
