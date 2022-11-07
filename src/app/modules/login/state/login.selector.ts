import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './loginState.model';

export const getState = createFeatureSelector<LoginState>('login'); //login bo to zostało uzyte w deklaracji reducer w module
export const getUserName = createSelector(getState, (state) => state.userName);
export const getToken = createSelector(getState, (state) => state.token);
export const getTokenUr = createSelector(getState, (state) => state.tokenUr);
export const getTokenExp = createSelector(getState, (state) => state.tokenExp);
export const getRefreshToken = createSelector(
  getState,
  (state) => state.refreshToken
);
export const getUserId = createSelector(getState, (state) => state.id);
