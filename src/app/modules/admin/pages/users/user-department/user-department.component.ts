import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GridEnum } from 'src/app/models/enums/gridEnum';
import { RequestBodyGetList } from 'src/app/models/requests/requestBodyGetList.model';
import { RequestGridDataColumn } from 'src/app/models/requests/requestGridDataColumn.model';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { IDictionaryComponent } from 'src/app/modules/dictionaries/interfaces/IDictionaryComponent';
import { FormDictionaryValueDialogComponent } from 'src/app/modules/universal-components/components/dialogs/form-dictionary-value-dialog/form-dictionary-value-dialog.component';
import { TableButtonService } from 'src/app/modules/universal-components/components/table-button/table-button.service';
import { TableService } from 'src/app/modules/universal-components/components/table/table.service';
import { ITableButtonsComponent } from 'src/app/modules/universal-components/interfaces/ITableButtonsComponent';
import { ITableComponent } from 'src/app/modules/universal-components/interfaces/ITableComponent';
import { RequestGridDataColumnValue } from 'src/app/modules/universal-components/models/requestGridDataColumnValue.model';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import {
  columnListPath,
  deleteModelWithParamsPath,
  getModelListPath,
  postModelPath,
} from 'src/app/services/path';
import { UserDepartment } from '../../../models/userDepartment';

@Component({
  selector: 'app-user-department',
  templateUrl: './user-department.component.html',
  styleUrls: ['./user-department.component.css'],
  providers: [DialogService],
})
export class UserDepartmentComponent
  implements
    OnInit,
    ITableButtonsComponent,
    IDictionaryComponent,
    ITableComponent,
    OnDestroy
{
  private _masterId: number;
  private postSub: Subscription;
  private deleteSub: Subscription;
  public get masterId(): number {
    return this._masterId;
  }
  @Input()
  public set masterId(v: number) {
    this._masterId = v;
    this.prepareRequest();
  }

  buttons: MenuItem[];
  obj: TableMenuStructure;
  columns: RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({ pageNumber: 10000 });
  responseObj: Observable<ResponseBodyGetList>;
  lazyLoadObj: LazyLoadEvent;
  selectedId: number;
  departmentId: number;
  userId: number;
  ref: DynamicDialogRef;
  dictModel = 'Department';
  dictGridId = GridEnum.Departments;
  model = 'UserDepartment';
  gridId = GridEnum.UserDepartments;

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private dialogService: DialogService,
    private tableButtonService: TableButtonService,
    private tableService: TableService,
    private apiService: ApiService
  ) {}

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

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }
  }

  getColumns(): void {
    this.apiService.getColumns(columnListPath(this.gridId)).subscribe({
      next: (res: RequestGridDataColumn) => {
        this.columns = this.tableService.GetColumnsOutput(res.value);
      },
      complete: () => {
        this.prepareRequest();
      },
    });
  }
  prepareRequest(ev?: LazyLoadEvent | undefined): void {
    if (this.columns && this.masterId) {
      let filter = this.commonService.getFilter4request(
        'userId',
        this.masterId?.toString() ?? '',
        'equals'
      );
      let requestObj = this.commonService.getRequestObj(this.columns, ev, [
        filter,
      ]);
      this.reqObjBS.next(requestObj);
    }
  }
  getLazyLoadEvent(ev: LazyLoadEvent): void {
    this.lazyLoadObj = ev;
    this.prepareRequest(this.lazyLoadObj);
  }

  getSelected(obj: any): void {
    this.selectedId = obj.id;
    this.departmentId = obj.departmentId;
    this.userId = obj.userId;
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
    let obj: UserDepartment = {
      id: 0,
      userId: this.masterId,
      departmentId: 0,
    };

    this.ref = this.dialogService.open(FormDictionaryValueDialogComponent, {
      data: [
        [
          getModelListPath(this.dictModel),
          columnListPath(this.dictGridId),
          'id',
          'departmentName',
        ],
        postModelPath(this.model),
        obj,
        ['departmentId'],
        undefined,
        false,
      ],
      contentStyle: { width: '500px' },
      header: this.translateService.instant('dict.header.user_department'),
    });

    this.postSub = this.ref.onClose.subscribe({
      next: (res: boolean) => {
        if (res) {
          this.refreshTable();
          this.postSub.unsubscribe();
        }
      },
    });
  }

  delete(): void {
    this.deleteSub = this.tableButtonService
      .delete(
        deleteModelWithParamsPath(
          this.model,
          'userId=' + this.userId + '&departmentId=' + this.departmentId
        )
      )
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
    throw new Error('Method not implemented.');
  }

  refreshTable(): void {
    this.prepareRequest(this.lazyLoadObj);
  }
}
