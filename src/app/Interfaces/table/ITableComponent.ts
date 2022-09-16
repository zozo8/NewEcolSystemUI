import { LazyLoadEvent } from "primeng/api";
import { BehaviorSubject } from "rxjs";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";

export declare interface ITableComponent {
  columnPath:string;
  getPath:string;

  columns:RequestGridDataColumnValue[];
  reqObjBS:BehaviorSubject<RequestBodyGetList>;

  getColumns():void;
  prepareRequest(ev:LazyLoadEvent):void;
  getLazyLoadEvent(ev:LazyLoadEvent):void;
  getSelected(ev:any):void;
}
