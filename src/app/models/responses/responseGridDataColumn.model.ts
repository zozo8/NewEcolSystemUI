import { ResponseGridDataColumnValue } from './responseGridDataColumnValue.model';

export class ResponseGridDataColumn {
  value: ResponseGridDataColumnValue[];
  success: boolean;
  errors: string;
  code: number;
}
