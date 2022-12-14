import { Filter } from '../requests/filter.model';

export interface ResponseGridDataColumnValue {
  filters?: Filter[];
  columnName: string;
  dataType: string;
  displayName: string;
  isVisible: boolean;
}
