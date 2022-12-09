import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GridEnum } from 'src/app/models/enums/gridEnum';
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
  selector: 'app-product-trade-name',
  templateUrl: './product-trade-name.component.html',
  styleUrls: ['./product-trade-name.component.css'],
})
export class ProductTradeNameComponent
  implements
    OnInit,
    ITableComponent,
    ITableButtonsComponent,
    IMasterPage,
    OnDestroy
{
  buttons: MenuItem[];
  obj: TableMenuStructure;
  model = 'ProductTradeName';

  columns: RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({ pageNumber: 10000 });
  responseObj: Observable<ResponseBodyGetList>;
  lazyLoadObj: LazyLoadEvent;
  selectedId: number;
  gridId = GridEnum.ProductTradeName;
  postPath: string;
  putPath: string;
  private compsiteSub = new Subscription();
  postSub: Subscription;
  deleteSub: Subscription;
  putSub: Subscription;

  static icon = 'pi pi-fw pi-list';

  constructor(
    private commonService: CommonService,
    private tableService: TableService,
    private translateService: TranslateService,
    private tableButtonService: TableButtonService,
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
    this.compsiteSub.add(
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
  prepareRequest(ev?: LazyLoadEvent | undefined): void {
    let requestObj = this.commonService.getRequestObj(this.columns, ev);
    this.reqObjBS.next(requestObj);
  }

  getLazyLoadEvent(ev: LazyLoadEvent): void {
    this.lazyLoadObj = ev;
    this.prepareRequest(this.lazyLoadObj);
  }

  getSelected(ev: any): void {
    var path = getModelPath(this.model, ev.id);
    this.selectedId = ev.id;
    this.tableService.getObjDto(path, this.obj);
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
        label: this.translateService.instant('btn.edit'),
        icon: 'pi pi-fw pi-pencil',
        disabled: false,
        command: () => this.put(),
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
    this.postSub = this.tableButtonService.post(this.obj).subscribe({
      next: (res: TableMenuStructure) => {
        this.obj = res;
        this.postSub.unsubscribe();
      },
    });
  }

  delete(): void {
    this.deleteSub = this.tableButtonService
      .delete(deleteModelPath(this.model, this.obj.objectDto.id))
      .subscribe({
        next: (res: boolean) => {
          if (res) {
            this.refreshTable();
            this.deleteSub.unsubscribe();
          }
        },
      });
  }

  put(): void {
    this.putSub = this.tableButtonService.put(this.obj).subscribe({
      next: (res: TableMenuStructure) => {
        this.obj = res;
        this.putSub.unsubscribe();
      },
    });
  }

  refreshTable(): void {
    this.prepareRequest(this.lazyLoadObj);
    this.obj.editState = false;
  }

  ngOnDestroy(): void {
    this.compsiteSub.unsubscribe();
  }
}
