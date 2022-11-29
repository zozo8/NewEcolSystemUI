import { createAction, props } from '@ngrx/store';
import { LoginState } from './loginState';

export const saveLoginObject = createAction(
  '[Login Service] saveLoginObject',
  props<{ obj: LoginState }>()
);

export const setDepartments = createAction(
  '[SelectDepartment Component] setDepartments',
  props<{ val: number[] }>()
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

export const setLanguage = createAction(
  '[Login component] setLanguage',
  props<{ language: string }>()
);

export const setLastActivity = createAction(
  '[Auth Service] setLastActivity',
  props<{ val: number }>()
);

export const changeLayout = createAction(
  '[Config Component]  changeLayout',
  props<{ val: string }>()
);
