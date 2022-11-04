import { createReducer, on } from '@ngrx/store';
import { ResponseLoginApi } from '../interfaces/responseLoginApi.model';
import * as loginActions from './login.actions';

export const initialState: ResponseLoginApi = {
  email: '',
  id: 0,
  refreshToken: '',
  token: '',
  userName: '',
  departmentsId: [],
  language: 'pl',
  tokenExp: 0,
  tokenUr: '',
};

export const loginReducer = createReducer(
  initialState,
  on(loginActions.saveLoginObject, (state, { obj }) => ({
    id: obj.id,
    email: obj.email,
    refreshToken: obj.refreshToken,
    token: obj.token,
    userName: obj.userName,
    language: obj.language,
    tokenExp: obj.tokenExp,
    tokenUr: obj.tokenUr,
  })),
  on(loginActions.saveTokenExp, (state, { exp }) => ({
    ...state,
    tokenExp: exp,
  })),
  on(loginActions.saveTokenUr, (state, { token }) => ({
    ...state,
    tokenUr: token,
  })),
  on(loginActions.changeDepartment, (state, { departments }) => ({
    ...state,
    departmentsId: departments,
  })),
  on(loginActions.changeLanguage, (state, { language }) => ({
    ...state,
    language: language,
  })),
  on(loginActions.clearTokens, (state) => ({
    ...state,
    token: '',
    tokenUr: '',
  }))
);
