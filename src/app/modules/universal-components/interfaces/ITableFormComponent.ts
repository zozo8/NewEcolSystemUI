import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { TableMenuStructure } from '../models/tableMenuStructure.model';

export interface ITableFormComponent {
  postPath: string;
  putPath: string;
  cols: ResponseGridDataColumnValue[];
  obj: TableMenuStructure;
  icon: string;

  getRefreshTable(): void;
}
