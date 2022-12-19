import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { GridEnum } from 'src/app/models/enums/gridEnum';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { ResponseGridDataColumn } from 'src/app/models/responses/responseGridDataColumn.model';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { getDepartments } from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { TableService } from 'src/app/modules/universal-components/components/table/table.service';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import {
  columnListPathByName,
  getProductsUnderMinimum,
} from 'src/app/services/path';

@Component({
  selector: 'app-products-under-minimal-state',
  templateUrl: './products-under-minimal-state.component.html',
  styleUrls: ['./products-under-minimal-state.component.scss'],
})
export class ProductsUnderMinimalStateComponent implements OnInit, OnDestroy {
  private compsiteSubs = new Subscription();

  model: string = 'Product';
  data: Observable<ResponseBodyGetList>;
  columns: ResponseGridDataColumnValue[];
  gridId: number = GridEnum.Products;
  columnsSub: Subscription;

  constructor(
    private store: Store<LoginState>,
    private commonService: CommonService,
    private apiService: ApiService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.columnsSub = this.apiService
      .getColumns(columnListPathByName(this.model))
      .subscribe({
        next: (res: ResponseGridDataColumn) => {
          this.columns = this.tableService.GetColumnsOutput(res.value);
        },
        complete: () => {
          this.getData();
          this.columnsSub.unsubscribe();
        },
      });
  }

  getData(ev?: LazyLoadEvent) {
    this.compsiteSubs.add(
      this.store.select(getDepartments).subscribe({
        next: (depts: number[]) => {
          const filters = this.commonService.getFilters4Departments(depts);
          if (filters.length > 0) {
            this.data = this.commonService.getObservableList4path(
              getProductsUnderMinimum(),
              columnListPathByName(this.model),
              filters,
              ev
            );
          }
        },
      })
    );
  }

  getLazyLoadEvent(ev: LazyLoadEvent): void {
    this.getData(ev);
  }

  ngOnDestroy(): void {
    this.compsiteSubs.unsubscribe();
  }
}