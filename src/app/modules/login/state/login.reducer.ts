import { Action } from '@fullcalendar/angular';
import { createReducer, on } from '@ngrx/store';
import * as loginActions from './login.actions';
import { initialLoginState, LoginState } from './loginState';

export const LOGIN_KEY = 'login';

export const loginReducer = createReducer(
  initialLoginState,
  on(loginActions.saveLoginObject, (state, { obj }) => ({
    ...state,
    id: obj.id,
    email: obj.email,
    refreshToken: obj.refreshToken,
    token: obj.token,
    userName: obj.userName,
  })),
  on(loginActions.saveTokenExp, (state, { exp }) => ({
    ...state,
    tokenExp: exp,
  })),
  on(loginActions.saveTokenUr, (state, { token }) => ({
    ...state,
    tokenUr: token,
  })),
  on(loginActions.clearTokens, (state) => ({
    ...state,
    token: '',
    tokenUr: '',
    refreshToken: '',
    tokenExp: 0,
    lastActivity: 0,
  })),
  on(loginActions.setLanguage, (state, { language }) => ({
    ...state,
    language: language,
  })),
  on(loginActions.setLastActivity, (state, { val }) => ({
    ...state,
    lastActivity: val,
  })),
  on(loginActions.setDepartments, (state, { val }) => ({
    ...state,
    departments: val,
  })),
  on(loginActions.removeDepartment, (state, { val }) => ({
    ...state,
    departments: state.departments.filter((x) => x !== val),
  })),
  on(loginActions.changeLayout, (state, { val }) => ({
    ...state,
    layout: val,
  }))
);

export function reducer(state: LoginState, action: Action): LoginState {
  return loginReducer(state, action);
}
