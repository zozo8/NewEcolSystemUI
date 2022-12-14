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
  on(loginActions.addTab, (state, { val }) => ({
    ...state,
    tabs: [...state.tabs, val],
  })),
  on(loginActions.removeTab, (state, { val }) => ({
    ...state,
    tabs: state.tabs.filter((v, i) => i !== val),
  })),
  on(loginActions.setActiveTab, (state, { val }) => ({
    ...state,
    activeTab: val,
  })),
  on(loginActions.setConfigLayout, (state, { val }) => ({
    ...state,
    configLayout: val,
  })),
  on(loginActions.setConfigComponentMode, (state, { val }) => ({
    ...state,
    configComponentMode: val,
  })),
  on(loginActions.setConfigMenuColor, (state, { val }) => ({
    ...state,
    configMenuColor: val,
  })),
  on(loginActions.setConfigMenuMode, (state, { val }) => ({
    ...state,
    configMenuMode: val,
  })),
  on(loginActions.setConfigPopularMode, (state, { val }) => ({
    ...state,
    configPopularMode: val,
  })),
  on(loginActions.setConfigScale, (state, { val }) => ({
    ...state,
    configScale: val,
  })),
  on(loginActions.setConfigTopbarMode, (state, { val }) => ({
    ...state,
    configTopbarMode: val,
  }))
);

export function reducer(state: LoginState, action: Action): LoginState {
  return loginReducer(state, action);
}
