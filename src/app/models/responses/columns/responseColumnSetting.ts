import { ResponseError } from '../responseError';
import { ResponseColumnSettingValue } from './responseColumnSettingValue';

export class ResponseColumnSetting {
  value: ResponseColumnSettingValue;
  success: boolean;
  errors: ResponseError;
  code: string;
}
