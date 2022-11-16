import { createAction, props } from '@ngrx/store';
import { Tab } from 'src/app/models/tab.model';
import { LoginState } from './loginState.model';

export const saveLoginObject = createAction(
  '[Login Service] saveLoginObject',
  props<{ obj: LoginState }>()
);

export const changeDepartment = createAction(
  '[Login Service] changeDepartment',
  props<{ departments: number[] }>()
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

export const addTab = createAction(
  '[Menuitem component] add tab',
  props<{ tab: Tab }>()
);

export const removeTab = createAction(
  '[Menuitem component] remove tab',
  props<{ tab: Tab }>()
);
