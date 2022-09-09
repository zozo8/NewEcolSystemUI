import { MenuItem } from "primeng/api";

export declare interface ITableButtonsComponent<T> {
  getButtons():MenuItem[];
  add(obj:T):void;
  edit(obj:T):void;
  delete(id:number):void;
}
