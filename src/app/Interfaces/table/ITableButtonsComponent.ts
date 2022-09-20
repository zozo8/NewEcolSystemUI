import { LazyLoadEvent, MenuItem } from "primeng/api";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";

// Interfejs dla przycisków, pobieramy liste przycisków i okodowujemy akcjez tch przycisków
// domyslnie dodawany jest crud
export interface ITableButtonsComponent {
  buttons:MenuItem[];
  obj:TableMenuStructure;
  //lazyLoadObj:LazyLoadEvent;
  deletePath:string;
  postPath:string;
  putPath:string;

  getButtons():MenuItem[];
  post(): void;
  delete():void;
  put():void;
  refresh():void;
}
