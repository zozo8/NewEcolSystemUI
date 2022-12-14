import { ResponseGridDataColumnValue } from './responseGridDataColumnValue.model';

export interface ResponseGridDataColumn {
  value: ResponseGridDataColumnValue[];
  success: boolean;
  errors: string;
  code: number;
}
