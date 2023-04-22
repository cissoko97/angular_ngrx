import { createFeatureSelector, createSelector } from '@ngrx/store';
import { keyWord } from 'app/core/utils/storeKey';
import { AuthState } from '.';

export const selectAuthState = createFeatureSelector<AuthState>(keyWord.AUTHSTORE);

export const getIsLoggedIn = createSelector(
  selectAuthState,
  (authState: AuthState) => authState?.loggedIn
)

export const getLoggedUser = createSelector(
  selectAuthState,
  (authState: AuthState) => authState?.user
)

/**
 * Get access token from Store
 */
export const getAccesToken = createSelector(
  selectAuthState,
  (authState: AuthState) => authState?.accessToken
)

/**
 * Get Refresh token from Store
 */
export const getRefreshToken = createSelector(
  selectAuthState,
  (authState: AuthState) => authState?.refreshToken
)
