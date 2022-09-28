import { LazyLoadEvent } from "primeng/api";
import { BehaviorSubject, Observable } from "rxjs";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";

export declare interface ITableComponent {
  columns:RequestGridDataColumnValue[];
  reqObjBS:BehaviorSubject<RequestBodyGetList>;
  responseObj:Observable<ResponseBodyGetList>;
  lazyLoadObj:LazyLoadEvent;
  selectedId:number;


  getColumns():void;
  prepareRequest(ev?:LazyLoadEvent):void;
  getLazyLoadEvent(ev:LazyLoadEvent):void;
  getSelected(ev:any):void;

}
