import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ResponseLoginApi } from '../interfaces/responseLoginApi.model';

export const getState = createFeatureSelector<ResponseLoginApi>('login'); //login bo to zostało uzyte w deklaracji reducer w module
export const getUserName = createSelector(getState, (state) => state.userName);
export const getToken = createSelector(getState, (state) => state.token);
export const getRefreshToken = createSelector(
  getState,
  (state) => state.refreshToken
);
export const getLanguage = createSelector(getState, (state) => state.language);
