import { RequestGridDataColumnValue } from '../../modules/universal-components/models/requestGridDataColumnValue.model';

export interface RequestGridDataColumn {
  value: RequestGridDataColumnValue[];
  success: boolean;
  errors: string;
  code: number;
}
