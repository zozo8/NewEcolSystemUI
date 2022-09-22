import { Filter } from "./filter.model";


export class RequestGridDataColumnValue {
  filters?: Filter[];
  columnName:string;
  dataType:string;
  displayName:string;
  isVisible: boolean;
}
