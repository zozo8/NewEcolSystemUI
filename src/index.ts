import { createSelector } from '@ngrx/store';
import { ResponseLoginApi } from './app/modules/login/state/loginState.model';

export const selectLogin = (state: ResponseLoginApi) => state;

export const selectLoginObj = createSelector(
  selectLogin,
  (state: ResponseLoginApi) => state
);
