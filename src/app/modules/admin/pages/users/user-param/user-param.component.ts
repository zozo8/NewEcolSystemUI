import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { GridEnum } from 'src/app/models/enums/gridEnum';
import { typeEnum } from 'src/app/models/enums/typeEnum';
import { TableButtonComponent } from 'src/app/modules/universal-components/components/table-button/table-button.component';
import { TableComponent } from 'src/app/modules/universal-components/components/table/table.component';
import { TableService } from 'src/app/modules/universal-components/components/table/table.service';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { CommonService } from 'src/app/services/common.service';
import { getModelPath, postModelPath } from 'src/app/services/path';
import { UserParam } from '../../../models/userParam';

@Component({
  selector: 'app-user-param',
  templateUrl: './user-param.component.html',
  styleUrls: ['./user-param.component.css'],
  providers: [DialogService],
})
export class UserParamComponent implements OnInit, OnDestroy {
  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(TableButtonComponent) tableButtonComponent: TableButtonComponent;

  private _masterId: number;
  public get masterId(): number {
    return this._masterId;
  }
  @Input()
  public set masterId(v: number) {
    this._masterId = v;

    if (this._masterId) {
      this.refreshTable();
    }
  }

  ref: DynamicDialogRef;
  static icon = PrimeIcons.LIST;
  icon = PrimeIcons.LIST;
  static title = 'pages.users.params';
  gridId = GridEnum.UserParams;
  multiselect = false;
  model = 'UserParam';

  buttons: MenuItem[];
  obj: TableMenuStructure = new TableMenuStructure();
  selectedId: number;
  postPath: string = postModelPath(this.model);
  putPath: string;
  compsiteSub = new Subscription();

  //for dict modal
  dictGridId = GridEnum.Params;
  dictModel = 'ParamDict';

  constructor(
    private translateService: TranslateService,
    private commonService: CommonService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.getButtons();
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
        command: () =>
          this.tableButtonComponent.delete(this.model, this.obj.objectDto.id),
      },
      {
        label: this.translateService.instant('btn.edit'),
        icon: 'pi pi-fw pi-pencil',
        disabled: true,
      },
      {
        label: this.translateService.instant('btn.refresh'),
        icon: 'pi pi-fw pi-refresh',
        disabled: false,
        command: () => this.tableButtonComponent.refreshTable.emit(),
      },
    ];
  }

  refreshTable(): void {
    let filter = this.commonService.getFilter4request(
      'userId',
      this.masterId.toString(),
      'equals',
      typeEnum.numeric
    );

    this.tableComponent.getData4Grid(this.gridId, [filter]);
    this.obj.editState = false;
  }

  getSelected(ev: any): void {
    var path = getModelPath(this.model, ev.id);
    this.selectedId = ev.id;
    this.tableService.getObjDto(path, this.obj);
  }

  post() {
    let obj: UserParam = {
      id: 0,
      userId: this.masterId,
      paramDictId: 0,
      paramValue: '',
    };

    let filter = this.commonService.getFilter4request(
      'isUser',
      'true',
      'equals'
    );

    this.tableButtonComponent.postModal(
      obj,
      this.model,
      this.dictModel,
      this.dictGridId,
      'id',
      'paramName',
      'paramDictId',
      true,
      [filter]
    );
  }

  ngOnDestroy(): void {
    if (this.ref) {
      this.ref.close();
    }

    this.compsiteSub.unsubscribe();
  }
}
