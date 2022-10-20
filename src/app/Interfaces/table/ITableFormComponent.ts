import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";

export declare interface ITableFormComponent {

  postPath:string;
  putPath:string;
  cols:RequestGridDataColumnValue[];
  obj:TableMenuStructure;
  icon:string;

  getRefreshTable():void;


}
