import { createFeatureSelector, createSelector } from '@ngrx/store';
import { keyWord } from 'app/utils/storeKey';
import { AuthState } from './model';

export const selectAuthState = createFeatureSelector<AuthState>(keyWord.AUTHSTORE);

export const getIsLoggedIn = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.loggedIn
)

export const getLoggedUser = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.user
)
