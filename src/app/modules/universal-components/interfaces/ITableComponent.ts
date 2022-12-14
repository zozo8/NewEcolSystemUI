import { LazyLoadEvent } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestBodyGetList } from 'src/app/models/requests/requestBodyGetList.model';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { TableMenuStructure } from '../models/tableMenuStructure.model';

export interface ITableComponent {
  columns: ResponseGridDataColumnValue[];
  reqObjBS: BehaviorSubject<RequestBodyGetList>;
  responseObj: Observable<ResponseBodyGetList>;
  lazyLoadObj: LazyLoadEvent;
  selectedId: number;
  gridId: number;
  obj: TableMenuStructure;
  model: string;

  getColumns(): void;
  prepareRequest(ev?: LazyLoadEvent): void;
  getLazyLoadEvent(ev: LazyLoadEvent): void;
  getSelected(ev: any): void;
}
