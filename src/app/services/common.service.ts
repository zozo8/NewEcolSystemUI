import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { base64StringToBlob } from 'blob-util';
import {
  FilterMetadata,
  LazyLoadEvent,
  MenuItem,
  MessageService,
} from 'primeng/api';
import { BehaviorSubject, Observable, Subject, Subscription, take } from 'rxjs';
import { typeEnum } from '../models/enums/typeEnum';
import { Filter } from '../models/requests/filter.model';
import { RequestBodyGetList } from '../models/requests/requestBodyGetList.model';
import { ResponseBodyGetList } from '../models/responses/responseBodyGetList.model';
import { ResponseGridDataColumn } from '../models/responses/responseGridDataColumn.model';
import { ResponseGridDataColumnValue } from '../models/responses/responseGridDataColumnValue.model';
import { addTab, setActiveTab } from '../modules/login/state/login.actions';
import { getTabs } from '../modules/login/state/login.selector';
import { LoginState } from '../modules/login/state/loginState';
import { ApiService } from './api.service';

// Common service to trochę anti pattern - rozbiłbym to na tematyczne serwisy
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  returnList: ResponseBodyGetList;
  listMenuItem: MenuItem[] = [];
  valueSub: Subscription;
  newTabSub: Subscription;

  constructor(
    private apiService: ApiService,
    private store: Store<LoginState>,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {}

  // get request from api for default params or dynamic params from universal table component (ev)
  getRequestObj(
    columns: ResponseGridDataColumnValue[],
    ev?: LazyLoadEvent,
    filters?: Filter[]
  ): RequestBodyGetList {
    if (ev === undefined) {
      // ev = {
      //   first: 1,
      //   rows: 10,
      //   sortField: 'id',
      //   sortOrder: -1,
      // };
      ev = {
        first: 1,
        rows: 10,
      };
    } else {
      let first = ev.first ?? 0;
      let rows = ev.rows ?? 10;
      ev.first = Math.floor(first / rows) + 1;
    }

    let obj: RequestBodyGetList = {
      pageNumber: ev.first,
      pageSize: ev?.rows,
      filter: {
        filters: this.prepareFilters(columns, ev, filters),
      },
    };

    if (ev.sortField) {
      obj.order = {
        columnName: ev?.sortField,
        isAscending: ev?.sortOrder === 1 ? false : true,
      };
    }
    return obj;
  }

  private prepareFilters(
    columns: ResponseGridDataColumnValue[],
    ev?: LazyLoadEvent,
    filters?: Filter[]
  ): ResponseGridDataColumnValue[] {
    var res: ResponseGridDataColumnValue[] = [];

    columns.forEach((val) => {
      // not from table
      var flrs = filters?.filter(
        (x) => x.field?.toLowerCase() === val.columnName.toLocaleLowerCase()
      );
      const filterCols: Filter[] = [];

      if (flrs) {
        flrs.forEach((f) => {
          filterCols.push(f);
        });
      }

      // from table
      if (ev?.filters !== undefined) {
        let filtersString = JSON.stringify(ev?.filters![val.columnName]);
        let filters: FilterMetadata[] = JSON.parse(filtersString);
        filters.forEach((el) => {
          if (el.value !== null) {
            filterCols.push({
              comparision: el.value === true ? 'equals' : el.matchMode,
              value: el.value === true ? '1' : el.value.toString(),
            });
          }
        });
      }

      res.push({
        filters: filterCols,
        columnName: val.columnName,
        dataType: this.getSepcificDataType4Api(val.dataType),
        displayName: val.columnName,
        isVisible: val.isVisible,
      });
    });

    // additional filter when column not exist, for masterId example
    const filtersAdditional = filters?.filter((x) => x.additional === true);
    if (filtersAdditional) {
      filtersAdditional.forEach((f) => {
        res.push({
          filters: [f],
          columnName: f.field ?? '',
          dataType: f.dataType ?? '',
          displayName: f.field ?? '',
          isVisible: false,
        });
      });
    }

    return res;
  }

  private getSepcificDataType4Api(val: string): string {
    switch (val) {
      case 'boolean':
        return 'boolean';
      case 'numeric':
        return 'Int32';
      case 'float':
        return 'single';
      case 'text':
        return 'String';
      case 'date':
        return 'DateTime';
      default:
        return val;
    }
  }

  // get ResponseBodyGetList by model, column, filter and event - universal function
  getObservableList4path(
    path: string,
    columnPath: string,
    filters?: Filter[],
    ev?: LazyLoadEvent
  ): Observable<ResponseBodyGetList> {
    var requestBS = new BehaviorSubject<RequestBodyGetList>({
      pageNumber: 100000,
    });
    var resBS = new Subject<ResponseBodyGetList>();
    var columns: ResponseGridDataColumnValue[];

    this.apiService.getColumns(columnPath).subscribe({
      next: (res: ResponseGridDataColumn) => {
        columns = res.value;
      },
      complete: () => {
        let requestObj = this.getRequestObj(columns, ev, filters);
        requestBS.next(requestObj);
      },
    });

    requestBS.subscribe((req) => {
      if (req.pageNumber !== 100000) {
        this.apiService.getResponseBodyGetList(path, req).subscribe({
          next: (res: ResponseBodyGetList) => {
            this.returnList = res;
          },
          complete: () => {
            resBS.next(this.returnList);
          },
        });
      }
    });

    return resBS.asObservable();
  }

  getMenuItemList(
    listPath: string,
    columnPath: string,
    id: string,
    label: string,
    filters?: Filter[]
  ): Observable<MenuItem[]> {
    let list: MenuItem[] = [];
    let retBS = new Subject<MenuItem[]>();

    this.getObservableList4path(listPath, columnPath, filters).subscribe({
      next: (res: ResponseBodyGetList) => {
        res.value.data.forEach((element) => {
          list.push({
            id: element[id],
            label: element[label],
          });
        });
        retBS.next(list);
      },
    });

    return retBS.asObservable();
  }

  // generate one filter object
  getFilter4request(
    field: string,
    value: string,
    comparision: string,
    dataType?: string,
    joinType?: string
  ): Filter {
    let obj: Filter = {
      field: field,
      value: value,
      comparision: comparision,
      joinType: joinType,
      additional: true,
      dataType: dataType,
    };

    return obj;
  }

  // get value from any observable obj
  getValueFromObservable(obj: Observable<any>): any {
    let value: any;
    this.valueSub = obj.pipe().subscribe({
      next: (v: any) => (value = v),
      complete: () => this.valueSub.unsubscribe(),
    });
    return value;
  }

  //generate filters, departments list
  getFilters4Departments(depts: number[]): Filter[] {
    const filters: Filter[] = [];
    depts.forEach((element) => {
      filters.push(
        this.getFilter4request(
          'DepartmentId',
          element.toString(),
          'equals',
          'OR',
          typeEnum.numeric
        )
      );
    });

    return filters;
  }

  addTabToStore(name: string) {
    this.store
      .select(getTabs)
      .pipe(take(1))
      .subscribe({
        next: (res: string[]) => {
          const tabIndex = res.findIndex((x) => x === name);
          if (tabIndex === -1) {
            this.store.dispatch(addTab({ val: name }));
            this.store.dispatch(setActiveTab({ val: res.length }));
          } else {
            this.store.dispatch(setActiveTab({ val: tabIndex }));
          }
        },
      });
  }

  getBlobFromBytes(bytes: string, type: string): Blob {
    var fileType: string = '';
    switch (type) {
      case 'xlsx':
        fileType = 'application/vnd.ms-excel';
        break;
      case 'pdf':
        fileType = 'application/pdf';
        break;
      case 'docx':
        fileType = 'application/vnd.ms-word';
        break;
    }

    const file = base64StringToBlob(bytes, fileType);
    return file;
  }

  getMessageToastBySeverity(severity: string, detailText: string): void {
    var errorLn: string;
    switch (severity) {
      case 'error':
        errorLn = 'table-menu.error';
        break;
      case 'success':
        errorLn = 'table-menu.success';
        break;
      case 'info':
        errorLn = 'table-menu.info';
        break;
      case 'warn':
        errorLn = 'table-menu.warning';
        break;
      default:
        errorLn = 'table-menu.warning';
        break;
    }

    this.messageService.add({
      severity: severity,
      summary: this.translateService.instant(errorLn),
      detail: detailText,
    });
  }
}
