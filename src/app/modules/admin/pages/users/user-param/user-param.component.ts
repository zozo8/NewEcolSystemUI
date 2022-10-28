import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IDictionaryComponent } from 'src/app/Interfaces/IDictionaryComponent';
import { ITableButtonsComponent } from 'src/app/Interfaces/table/ITableButtonsComponent';
import { ITableComponent } from 'src/app/Interfaces/table/ITableComponent';
import { UserParam } from 'src/app/models/dto/modules/admin/userParam';
import { RequestBodyGetList } from 'src/app/models/requests/requestBodyGetList.model';
import { RequestGridDataColumn } from 'src/app/models/requests/requestGridDataColumn.model';
import { RequestGridDataColumnValue } from 'src/app/models/requests/requestGridDataColumnValue.model';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { TableMenuStructure } from 'src/app/models/tableMenuStructure';
import { FormDictionaryValueDialogComponent } from 'src/app/modules/universal-components/components/dialogs/form-dictionary-value-dialog/form-dictionary-value-dialog.component';
import { TableButtonService } from 'src/app/modules/universal-components/components/table-button/table-button.service';
import { TableService } from 'src/app/modules/universal-components/components/table/table.service';
import { BaseService } from 'src/app/services/base.service';
import { PathService } from 'src/app/services/path.service';
import { GridEnum } from 'src/app/utils/gridEnum';

@Component({
  selector: 'app-user-param',
  templateUrl: './user-param.component.html',
  styleUrls: ['./user-param.component.css'],
  providers: [DialogService],
})
export class UserParamComponent
  implements
    ITableButtonsComponent,
    ITableComponent,
    IDictionaryComponent,
    OnDestroy,
    OnInit
{
  private _masterId: number;
  private compsiteSub = new Subscription();
  postSub: Subscription;
  deleteSub: Subscription;
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
  model = 'UserParam';
  dictModel = 'ParamDict';
  dictGridId = GridEnum.Params;
  columns: RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({ pageNumber: 10000 });
  responseObj: Observable<ResponseBodyGetList>;
  lazyLoadObj: LazyLoadEvent;
  selectedId: number;
  ref: DynamicDialogRef;
  gridId = GridEnum.UserParams;

  constructor(
    private tableButtonService: TableButtonService,
    private translateService: TranslateService,
    public dialogService: DialogService,
    private baseService: BaseService,
    private tableService: TableService,
    private pathService: PathService
  ) {}

  ngOnInit(): void {
    this.getColumns();
    this.getButtons();

    this.reqObjBS.subscribe((request) => {
      if (request?.pageNumber !== 10000) {
        this.responseObj = this.baseService.getResponseObj(
          this.pathService.getList(this.model),
          request
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
      this.compsiteSub.unsubscribe();
    }
  }

  getColumns(): void {
    this.compsiteSub.add(
      this.baseService
        .getColumns(this.pathService.columnList(this.gridId))
        .subscribe({
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
    if (this.columns && this.masterId) {
      let filter = this.baseService.getFilter4request(
        'userId',
        this.masterId?.toString() ?? '',
        'equals'
      );
      let requestObj = this.baseService.getRequestObj(this.columns, ev, [
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
  }

  refreshTable(): void {
    this.prepareRequest(this.lazyLoadObj);
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
    let obj: UserParam = {
      id: 0,
      userId: this.masterId,
      paramDictId: 0,
      paramValue: '',
    };

    let filter = this.baseService.getFilter4request('isUser', 'true', 'equals');
    this.ref = this.dialogService.open(FormDictionaryValueDialogComponent, {
      data: [
        [
          this.pathService.getList(this.dictModel),
          this.pathService.columnList(this.dictGridId),
          'id',
          'paramName',
        ],
        this.pathService.post(this.model),
        obj,
        ['paramDictId', 'paramValue'],
        [filter],
        true,
      ],
      contentStyle: { width: '500px' },
      header: this.translateService.instant('dict.header.user_param'),
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
      .delete(this.pathService.delete(this.model, this.selectedId))
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
}
