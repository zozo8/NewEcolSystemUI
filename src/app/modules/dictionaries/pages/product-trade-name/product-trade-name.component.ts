import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent, MenuItem, PrimeIcons } from 'primeng/api';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GridEnum } from 'src/app/models/enums/gridEnum';
import { RequestBodyGetList } from 'src/app/models/requests/requestBodyGetList.model';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { TableButtonService } from 'src/app/modules/universal-components/components/table-button/table-button.service';
import { TableComponent } from 'src/app/modules/universal-components/components/table/table.component';
import { TableService } from 'src/app/modules/universal-components/components/table/table.service';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import {
  deleteModelPath,
  getModelPath,
  postModelPath,
} from 'src/app/services/path';

@Component({
  selector: 'app-product-trade-name',
  templateUrl: './product-trade-name.component.html',
  styleUrls: ['./product-trade-name.component.css'],
})
export class ProductTradeNameComponent implements OnInit, OnDestroy {
  @ViewChild(TableComponent) tableComponent: TableComponent;

  static icon = PrimeIcons.LIST;
  static title = 'pages.product_trade_name.title';

  buttons: MenuItem[];
  obj: TableMenuStructure;
  model = 'ProductTradeName';

  columns: ResponseGridDataColumnValue[];
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
  multiselect = true;

  constructor(
    private tableService: TableService,
    private translateService: TranslateService,
    private tableButtonService: TableButtonService
  ) {
    this.postPath = postModelPath(this.model);
    this.obj = new TableMenuStructure();
  }

  ngOnInit(): void {
    this.getButtons();
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
        this.postSub?.unsubscribe();
      },
    });
  }

  put(): void {
    this.putSub = this.tableButtonService.put(this.obj).subscribe({
      next: (res: TableMenuStructure) => {
        this.obj = res;
        this.putSub?.unsubscribe();
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
            this.deleteSub?.unsubscribe();
          }
        },
      });
  }

  refreshTable(): void {
    this.tableComponent.refreshData();
    this.obj.editState = false;
  }

  ngOnDestroy(): void {
    this.compsiteSub.unsubscribe();
  }
}
