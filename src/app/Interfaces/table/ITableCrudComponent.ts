export declare interface ITableCrudComponent<T> {
  add(obj:T):void;
  edit(obj:T):void;
  delete(id:number):void;
}
