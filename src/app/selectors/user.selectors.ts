import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "app/reducer/users.reducer";

export const selectUsers = createFeatureSelector<UserState>('users');

// export const selectord = createSelector(selectUsers, (users) => {
//   return { users: [], length: 0 }
// })


