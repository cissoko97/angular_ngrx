import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './model';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const getIsLoggedIn = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.loggedIn
)

export const getLoggedUser = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.user
)
