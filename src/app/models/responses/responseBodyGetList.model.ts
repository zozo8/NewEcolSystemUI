import { ResponseBodyGetListValue } from './responseBodyGetListValue.model';

export interface ResponseBodyGetList {
  code?: number;
  errors?: any;
  success?: boolean;
  value: ResponseBodyGetListValue;
}
