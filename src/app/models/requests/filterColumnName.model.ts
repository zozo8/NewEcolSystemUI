import { Filter } from './filter.model';

export class FilterColumnName {
  filters?: Filter[];
  columnName: string;
  dataType: string;
  displayName: string;
  isVisible: boolean;
}
