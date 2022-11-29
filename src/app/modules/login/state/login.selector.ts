import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOGIN_KEY } from './login.reducer';
import { LoginState } from './loginState';

export const getState = createFeatureSelector<LoginState>(LOGIN_KEY); //login bo to zostało uzyte w deklaracji reducer w module
export const getUserName = createSelector(getState, (state) => state.userName);
export const getToken = createSelector(getState, (state) => state.token);
export const getTokenUr = createSelector(getState, (state) => state.tokenUr);
export const getTokenExp = createSelector(getState, (state) => state.tokenExp);
export const getRefreshToken = createSelector(
  getState,
  (state) => state.refreshToken
);
export const getUserId = createSelector(getState, (state) => state.id);
export const getLanguage = createSelector(getState, (state) => state.language);
export const getLastActivity = createSelector(
  getState,
  (state) => state.lastActivity
);

export const getDepartments = createSelector(
  getState,
  (state) => state.departments
);

export const getLayout = createSelector(getState, (state) => state.layout);
