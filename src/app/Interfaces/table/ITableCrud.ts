export declare interface ITableCrud<T> {
  add(obj:T):void;
  edit(obj:T):void;
  delete(id:number):void;
}
