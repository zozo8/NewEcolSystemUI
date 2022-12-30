import { ResponseError } from './responseError';

export class ResponseBodyById {
  code?: number;
  errors?: ResponseError;
  success?: boolean;
  value: any;
}
