import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent, MenuItem, PrimeIcons } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { GridEnum } from 'src/app/models/enums/gridEnum';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { ResponseGridDataColumn } from 'src/app/models/responses/responseGridDataColumn.model';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { TableButtonService } from 'src/app/modules/universal-components/components/table-button/table-button.service';
import { TableService } from 'src/app/modules/universal-components/components/table/table.service';
import { ITableButtonsComponent } from 'src/app/modules/universal-components/interfaces/ITableButtonsComponent';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import {
  columnListPath,
  deleteModelPath,
  getModelListPath,
  getModelPath,
} from 'src/app/services/path';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent
  implements OnInit, OnDestroy, ITableButtonsComponent
{
  static icon = PrimeIcons.LIST;
  static title = 'pages.client.title';

  columns: ResponseGridDataColumnValue[];
  responseObj: Observable<ResponseBodyGetList>;
  lazyLoadObj: LazyLoadEvent;
  selectedId: number;
  gridId = GridEnum.Clients;
  obj: TableMenuStructure = new TableMenuStructure();
  model = 'Client';
  compositeSubscription = new Subscription();

  buttons: MenuItem[];
  postSub: Subscription;
  deleteSub: Subscription;
  putSub: Subscription;

  constructor(
    private translateService: TranslateService,
    private apiService: ApiService,
    private tableService: TableService,
    private commonService: CommonService,
    private tableButtonService: TableButtonService
  ) {}

  ngOnInit(): void {
    this.getColumns();
    this.getButtons();
  }

  getColumns(): void {
    this.compositeSubscription.add(
      this.apiService.getColumns(columnListPath(GridEnum.Clients)).subscribe({
        next: (res: ResponseGridDataColumn) => {
          this.columns = this.tableService.GetColumnsOutput(res.value);
        },
        complete: () => {
          this.getData();
        },
      })
    );
  }

  getData(ev?: LazyLoadEvent): void {
    this.responseObj = this.commonService.getObservableList4path(
      getModelListPath(this.model),
      columnListPath(GridEnum.Clients),
      undefined,
      ev
    );
  }
  getLazyLoadEvent(ev: LazyLoadEvent): void {
    this.getData(ev);
  }

  getSelected(ev: any): void {
    let path = getModelPath(this.model, ev.id);
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
    this.getData(this.lazyLoadObj);
    this.obj.editState = false;
  }

  ngOnDestroy(): void {
    this.compositeSubscription.unsubscribe();
  }
}
