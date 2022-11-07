import { RequestGridDataColumnValue } from 'src/app/modules/universal-components/models/requestGridDataColumnValue.model';
import { TableMenuStructure } from '../models/tableMenuStructure.model';

export interface ITableFormComponent {
  postPath: string;
  putPath: string;
  cols: RequestGridDataColumnValue[];
  obj: TableMenuStructure;
  icon: string;

  getRefreshTable(): void;
}
