import {  MenuItem } from "primeng/api";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";

export interface ITableButtonsComponent {
  buttons:MenuItem[];
  obj:TableMenuStructure;
  model:string;
  getButtons():void;
  post(): void;
  delete():void;
  put():void;
  refreshTable():void;
}
