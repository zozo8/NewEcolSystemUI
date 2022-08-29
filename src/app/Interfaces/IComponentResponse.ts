import { LazyLoadEvent } from "primeng/api";

export declare interface IComponentResponse {
  onNewRequestParam(ev:LazyLoadEvent):void;
 // getResponse(ev:LazyLoadEvent | null):void;
  prepareRequest(ev:LazyLoadEvent | null):void;
}
