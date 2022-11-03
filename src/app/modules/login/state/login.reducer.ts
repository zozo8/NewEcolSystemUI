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
  })),
  on(loginActions.changeDepartment, (state, { departments }) => ({
    ...state,
    departmentsId: departments,
  })),
  on(loginActions.changeLanguage, (state, { language }) => ({
    ...state,
    language: language,
  }))
);
