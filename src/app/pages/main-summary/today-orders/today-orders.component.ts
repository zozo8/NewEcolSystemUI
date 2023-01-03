import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Subscription } from 'rxjs';
import { GridEnum } from 'src/app/models/enums/gridEnum';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { TableButtonComponent } from 'src/app/modules/universal-components/components/table-button/table-button.component';
import { TableComponent } from 'src/app/modules/universal-components/components/table/table.component';
import { TableService } from 'src/app/modules/universal-components/components/table/table.service';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { getModelPath } from 'src/app/services/path';

@Component({
  selector: 'app-today-orders',
  templateUrl: './today-orders.component.html',
  styleUrls: ['./today-orders.component.scss'],
})
export class TodayOrdersComponent implements OnInit, OnDestroy {
  @ViewChild(TableComponent) tableComponent: TableComponent;
  @ViewChild(TableButtonComponent) tableButtonComponent: TableButtonComponent;
  private compsiteSubs = new Subscription();

  static icon = PrimeIcons.LIST;
  icon = PrimeIcons.LIST;
  static title = 'pages.main_summary.orders_today';
  gridId = GridEnum.Orders;
  multiselect = false;
  model = 'Order';

  buttons: MenuItem[];
  obj: TableMenuStructure = new TableMenuStructure();
  selectedId: number;

  constructor(
    private store: Store<LoginState>,
    private commonService: CommonService,
    private apiService: ApiService,
    private tableService: TableService,
    private translateService: TranslateService
  ) {}
  ngOnInit(): void {
    this.getButtons();
  }

  getButtons(): void {
    this.buttons = [
      {
        label: this.translateService.instant('btn.refresh'),
        icon: 'pi pi-fw pi-refresh',
        disabled: false,
        command: () => this.tableButtonComponent.refreshTable.emit(),
      },
    ];
  }

  // ngOnInit(): void {
  //   this.compsiteSubs.add(
  //     this.apiService.getColumns(columnListPath(GridEnum.Orders)).subscribe({
  //       next: (res: ResponseGridDataColumn) => {
  //         this.columns = this.tableService.GetColumnsOutput(res.value);
  //       },
  //       complete: () => {
  //         this.getData();
  //       },
  //     })
  //   );
  // }

  // getData(ev?: LazyLoadEvent) {
  //   this.store.select(getDepartments).subscribe({
  //     next: (depts: number[]) => {
  //       const filters = this.commonService.getFilters4Departments(depts);
  //       if (filters.length > 0) {
  //         this.data = this.commonService.getObservableList4path(
  //           getModelListPath(this.model),
  //           columnListPath(GridEnum.Orders),
  //           filters,
  //           ev
  //         );
  //       }
  //     },
  //   });
  // }

  // getLazyLoadEvent(ev: LazyLoadEvent): void {
  //   this.getData(ev);
  // }

  getSelected(ev: any): void {
    var path = getModelPath(this.model, ev.id);
    this.selectedId = ev.id;
    this.tableService.getObjDto(path, this.obj);
  }

  refreshTable(): void {
    this.tableComponent.getColumns(this.gridId);
    this.obj.editState = false;
  }

  ngOnDestroy(): void {
    this.compsiteSubs.unsubscribe();
  }
}
