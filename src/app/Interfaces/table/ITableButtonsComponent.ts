import { LazyLoadEvent, MenuItem } from "primeng/api";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";

export interface ITableButtonsComponent {
  buttons:MenuItem[];
  obj:TableMenuStructure;
  deletePath:string;
  postPath:string;
  putPath:string;

  getButtons():void;
  post(): void;
  delete():void;
  put():void;
  refresh():void;
}
