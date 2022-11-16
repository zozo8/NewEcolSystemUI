import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GridEnum } from 'src/app/models/gridEnum';
import { RequestBodyGetList } from 'src/app/models/requests/requestBodyGetList.model';
import { RequestGridDataColumn } from 'src/app/models/requests/requestGridDataColumn.model';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { TableButtonService } from 'src/app/modules/universal-components/components/table-button/table-button.service';
import { TableService } from 'src/app/modules/universal-components/components/table/table.service';
import { IMasterPage } from 'src/app/modules/universal-components/interfaces/IMasterPage';
import { ITableButtonsComponent } from 'src/app/modules/universal-components/interfaces/ITableButtonsComponent';
import { ITableComponent } from 'src/app/modules/universal-components/interfaces/ITableComponent';
import { RequestGridDataColumnValue } from 'src/app/modules/universal-components/models/requestGridDataColumnValue.model';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import {
  columnListPath,
  deleteModelPath,
  getModelListPath,
  getModelPath,
  postModelPath,
} from 'src/app/services/path';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent
  implements
    OnInit,
    ITableComponent,
    ITableButtonsComponent,
    IMasterPage,
    OnDestroy
{
  obj: TableMenuStructure;
  lazyLoadObj: LazyLoadEvent;
  responseObj: Observable<ResponseBodyGetList>;
  columns: RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({ pageNumber: 10000 });
  selectedId: number;
  postPath: string;
  putPath: string;
  gridId: number = GridEnum.Users;

  model = 'User';
  buttons: MenuItem[];
  private compositeSubscription = new Subscription();
  private postSubscription: Subscription;
  private putSubscription: Subscription;
  deleteSubscription: Subscription;

  static icon = 'pi pi-user';
  static header = 'jakis szerszy opis okna uzytkownikow';

  constructor(
    private tableService: TableService,
    private translateService: TranslateService,
    private tableButtonService: TableButtonService,
    private CommonService: CommonService,
    private apiService: ApiService
  ) {
    this.postPath = postModelPath(this.model);
    this.obj = new TableMenuStructure();
  }

  ngOnInit(): void {
    this.getColumns();
    this.getButtons();

    this.reqObjBS.subscribe((request) => {
      if (request?.pageNumber !== 10000) {
        this.responseObj = this.apiService.getResponseObj(
          getModelListPath(this.model),
          request
        );
      }
    });
  }

  getColumns(): void {
    this.compositeSubscription.add(
      this.apiService.getColumns(columnListPath(this.gridId)).subscribe({
        next: (res: RequestGridDataColumn) => {
          this.columns = this.tableService.GetColumnsOutput(res.value);
        },
        complete: () => {
          this.prepareRequest();
        },
      })
    );
  }

  prepareRequest(ev?: LazyLoadEvent): void {
    let requestObj = this.CommonService.getRequestObj(this.columns, ev);
    this.reqObjBS.next(requestObj);
  }

  getLazyLoadEvent(ev: LazyLoadEvent): void {
    this.lazyLoadObj = ev;
    this.prepareRequest(this.lazyLoadObj);
  }

  getSelected(ev: any): void {
    let path = getModelPath(this.model, ev.id);
    this.selectedId = ev.id;

    this.tableService.getObjDto(path, this.obj);
  }

  getSelectedColumns(): void {
    this.getColumns();
  }

  refreshTable(): void {
    this.prepareRequest(this.lazyLoadObj);
    this.obj.editState = false;
  }

  getButtons(): void {
    this.buttons = [
      {
        label: this.translateService.instant('btn.add'),
        icon: 'pi pi-fw pi-plus',
        disabled: false,
        command: () => this.post(),
      },
      {
        label: this.translateService.instant('btn.remove'),
        icon: 'pi pi-fw pi-minus',
        disabled: false,
        command: () => this.delete(),
      },
      {
        label: this.translateService.instant('btn.refresh'),
        icon: 'pi pi-fw pi-refresh',
        disabled: false,
        command: () => this.refreshTable(),
      },
    ];
  }

  post(): void {
    this.postSubscription = this.tableButtonService.post(this.obj).subscribe({
      next: (res: TableMenuStructure) => {
        this.obj = res;
        this.postSubscription.unsubscribe();
      },
    });
  }

  put(): void {
    this.putSubscription = this.tableButtonService.put(this.obj).subscribe({
      next: (res: TableMenuStructure) => {
        this.obj = res;
        this.putSubscription.unsubscribe();
      },
    });
  }

  delete(): void {
    this.deleteSubscription = this.tableButtonService
      .delete(deleteModelPath(this.model, this.obj.objectDto.id))
      .subscribe({
        next: (res: boolean) => {
          if (res) {
            this.refreshTable();
            this.deleteSubscription.unsubscribe();
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.compositeSubscription.unsubscribe();
  }
}
