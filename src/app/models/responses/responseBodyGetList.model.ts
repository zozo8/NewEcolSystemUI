import { ResponseBodyGetListValue } from './responseBodyGetListValue.model';
import { ResponseError } from './responseError';

export class ResponseBodyGetList {
  code?: number;
  errors?: ResponseError;
  success?: boolean;
  value: ResponseBodyGetListValue;
}
