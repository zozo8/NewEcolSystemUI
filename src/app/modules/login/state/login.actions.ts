import { createAction, props } from '@ngrx/store';
import { ResponseLoginApi } from '../interfaces/responseLoginApi.model';

export const saveLoginObject = createAction(
  '[Login Service] saveLoginObject',
  props<{ obj: ResponseLoginApi }>()
);

export const changeDepartment = createAction(
  '[Login Service] changeDepartment',
  props<{ departments: number[] }>()
);

export const changeLanguage = createAction(
  '[Login Service] changelanguage',
  props<{ language: string }>()
);
