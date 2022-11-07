import { MenuItem } from 'primeng/api';
import { TableMenuStructure } from '../models/tableMenuStructure.model';

export interface ITableButtonsComponent {
  buttons: MenuItem[];
  obj: TableMenuStructure;
  model: string;
  getButtons(): void;
  post(): void;
  delete(): void;
  put(): void;
  refreshTable(): void;
}
