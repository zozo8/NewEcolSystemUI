import { Filter } from "./filter.model";

export interface FilterColumnName {
  filters?:Filter[];
  columnName:string;
  dataType:string;
  displayName:string;
  isVisible:boolean;
}
