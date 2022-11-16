import { createReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as loginActions from './login.actions';
import { LoginState } from './loginState.model';

export const initialState: LoginState = {
  email: '',
  id: 0,
  refreshToken: '',
  token: '',
  userName: '',
  tokenExp: 0,
  tokenUr: '',
  language: environment.languages[0],
  tabs: [],
};

export const loginReducer = createReducer(
  initialState,
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
  on(loginActions.changeDepartment, (state, { departments }) => ({
    ...state,
    departmentsId: departments,
  })),
  on(loginActions.clearTokens, (state) => ({
    ...state,
    token: '',
    tokenUr: '',
  })),
  on(loginActions.setLanguage, (state, { language }) => ({
    ...state,
    language: language,
  })),
  on(loginActions.addTab, (state, { tab }) => ({
    ...state,
    tabs: [...state.tabs, tab],
  })),
  on(loginActions.removeTab, (state, { tab }) => ({
    ...state,
    tabs: [...state.tabs.splice(0, tab.component), ...state.tabs.splice(1)],
  }))
);
