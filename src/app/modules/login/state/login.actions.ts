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

export const removeDepartment = createAction(
  '[TopBar Component] removeDepartment',
  props<{ val: number }>()
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

export const addTab = createAction(
  '[Dashboard Component] addTab',
  props<{ val: string }>()
);

export const removeTab = createAction(
  '[Dahboard Component] removeTab',
  props<{ val: number }>()
);

export const setActiveTab = createAction(
  '[Dahboard Component] setActiveTab',
  props<{ val: number }>()
);

export const setConfigLayout = createAction(
  '[Config Component] setConfigLayout',
  props<{ val: string }>()
);

export const setConfigComponentMode = createAction(
  '[Config Component] setConfigComponentMode',
  props<{ val: string }>()
);

export const setConfigMenuColor = createAction(
  '[Config Component] setConfigMenuColor',
  props<{ val: string }>()
);

export const setConfigMenuMode = createAction(
  '[Config Component] setConfigMenuMode',
  props<{ val: string }>()
);

export const setConfigPopularMode = createAction(
  '[Config Component] setConfigPopularMode',
  props<{ val: string }>()
);

export const setConfigScale = createAction(
  '[Config Component] setConfigScale',
  props<{ val: number }>()
);

export const setConfigTopbarMode = createAction(
  '[Config Component] setConfigTopbarMode',
  props<{ val: string }>()
);
