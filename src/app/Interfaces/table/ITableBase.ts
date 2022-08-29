import { LazyLoadEvent } from "primeng/api";

export declare interface ITableBase {
  getColumns():void;
  prepareRequest(ev:LazyLoadEvent | null):void;
  getRequestObjFromComponent(ev:LazyLoadEvent):void;
}
