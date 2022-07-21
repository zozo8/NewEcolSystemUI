import { RequestGridDataColumnValue } from "./requestGridDataColumnValue.model";

export interface RequestGridDataColumn {
  value:RequestGridDataColumnValue[];
  success:boolean;
  errors:string;
  code:number;
}
