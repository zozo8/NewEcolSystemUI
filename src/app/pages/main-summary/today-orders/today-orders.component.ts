import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { GridEnum } from 'src/app/models/gridEnum';
import { RequestGridDataColumn } from 'src/app/models/requests/requestGridDataColumn.model';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { getDepartments } from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { TableService } from 'src/app/modules/universal-components/components/table/table.service';
import { RequestGridDataColumnValue } from 'src/app/modules/universal-components/models/requestGridDataColumnValue.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { columnListPath, getModelListPath } from 'src/app/services/path';

@Component({
  selector: 'app-today-orders',
  templateUrl: './today-orders.component.html',
  styleUrls: ['./today-orders.component.scss'],
})
export class TodayOrdersComponent implements OnInit, OnDestroy {
  private compsiteSubs = new Subscription();

  model: string = 'Order';
  data: Observable<ResponseBodyGetList>;
  columns: RequestGridDataColumnValue[];
  gridId: number = GridEnum.Orders;

  constructor(
    private store: Store<LoginState>,
    private commonService: CommonService,
    private apiService: ApiService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.compsiteSubs.add(
      this.apiService.getColumns(columnListPath(GridEnum.Orders)).subscribe({
        next: (res: RequestGridDataColumn) => {
          this.columns = this.tableService.GetColumnsOutput(res.value);
        },
        complete: () => {
          this.getData();
        },
      })
    );
  }

  getData(ev?: LazyLoadEvent) {
    this.store.select(getDepartments).subscribe({
      next: (depts: number[]) => {
        const filters = this.commonService.getFilters4Departments(depts);
        if (filters.length > 0) {
          this.data = this.commonService.getObservableList4path(
            getModelListPath(this.model),
            columnListPath(GridEnum.Orders),
            filters,
            ev
          );
        }
      },
    });
  }

  getLazyLoadEvent(ev: LazyLoadEvent): void {
    this.getData(ev);
  }

  ngOnDestroy(): void {
    this.compsiteSubs.unsubscribe();
  }
}
