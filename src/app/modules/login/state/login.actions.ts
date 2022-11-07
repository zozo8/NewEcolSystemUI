import { createAction, props } from '@ngrx/store';
import { LoginState } from './loginState.model';

export const saveLoginObject = createAction(
  '[Login Service] saveLoginObject',
  props<{ obj: LoginState }>()
);

export const changeDepartment = createAction(
  '[Login Service] changeDepartment',
  props<{ departments: number[] }>()
);

export const changeLanguage = createAction(
  '[Login Service] changeLanguage',
  props<{ language: string }>()
);

export const saveTokenExp = createAction(
  '[Login Service] saveTokenExp',
  props<{ exp: number }>()
);

export const saveTokenUr = createAction(
  '[Login Service] saveTokenUr',
  props<{ token: string }>()
);

export const clearTokens = createAction('[Auth Service] clearTokens');
