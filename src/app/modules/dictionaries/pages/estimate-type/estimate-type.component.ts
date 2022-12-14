import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent, PrimeIcons } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { GridEnum } from 'src/app/models/enums/gridEnum';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { ResponseGridDataColumn } from 'src/app/models/responses/responseGridDataColumn.model';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { TableService } from 'src/app/modules/universal-components/components/table/table.service';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import {
  columnListPath,
  getModelListPath,
  getModelPath,
} from 'src/app/services/path';

@Component({
  selector: 'app-estimate-type',
  templateUrl: './estimate-type.component.html',
  styleUrls: ['./estimate-type.component.scss'],
})
export class EstimateTypeComponent implements OnInit, OnDestroy {
  static icon = PrimeIcons.LIST;
  static title = 'pages.estimate_type.title';

  columns: ResponseGridDataColumnValue[];
  responseObj: Observable<ResponseBodyGetList>;
  lazyLoadObj: LazyLoadEvent;
  selectedId: number;
  gridId = GridEnum.EstimateType;
  multiselect = true;
  obj: TableMenuStructure = new TableMenuStructure();
  model = 'EstimateType';
  compositeSubscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private apiService: ApiService,
    private tableService: TableService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getColumns();
  }

  getColumns(): void {
    this.compositeSubscription.add(
      this.apiService
        .getColumns(columnListPath(GridEnum.EstimateType))
        .subscribe({
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
      columnListPath(GridEnum.EstimateType),
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

  ngOnDestroy(): void {
    this.compositeSubscription.unsubscribe();
  }
}
