import { Filter } from '../requests/filter.model';

export class ResponseGridDataColumnValue {
  filters?: Filter[];
  columnName: string;
  dataType: string;
  displayName: string;
  isVisible: boolean;
}
