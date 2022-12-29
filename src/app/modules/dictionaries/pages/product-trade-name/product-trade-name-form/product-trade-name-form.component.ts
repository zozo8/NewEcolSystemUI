import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardPageComponent } from 'src/app/components/pages/dashboard-page/dashboard-page.component';
import { GridEnum } from 'src/app/models/enums/gridEnum';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { ITableFormComponent } from 'src/app/modules/universal-components/interfaces/ITableFormComponent';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { CommonService } from 'src/app/services/common.service';
import { columnListPath, getModelListPath } from 'src/app/services/path';
import { estimateType } from '../../../models/estimateType.model';
import { productTradeName } from '../../../models/productTradeName.model';

@Component({
  selector: 'app-product-trade-name-form',
  templateUrl: './product-trade-name-form.component.html',
  styleUrls: ['./product-trade-name-form.component.css'],
})
export class ProductTradeNameFormComponent
  implements ITableFormComponent, OnInit
{
  @Input()
  postPath: string;
  @Input()
  putPath: string;
  @Input()
  cols: ResponseGridDataColumnValue[];
  @Input()
  obj: TableMenuStructure;
  @Input()
  icon: string;
  @Input()
  gridId: number;

  @Output()
  refreshTable = new EventEmitter();

  wasteSub: Subscription;
  estimateSub: Subscription;

  estimateTypeDict: estimateType[] = [];
  wasteCodeDict: productTradeName[] = [];

  constructor(
    private commonService: CommonService,
    public dashboard: DashboardPageComponent
  ) {}

  ngOnInit(): void {
    this.getEstimateType();
    this.getWasteCodeDict();
  }

  getWasteCodeDict() {
    this.wasteSub = this.commonService
      .getObservableList4path(
        getModelListPath('ProductTradeName'),
        columnListPath(GridEnum.ProductTradeName)
      )
      .subscribe({
        next: (res: ResponseBodyGetList) => {
          this.wasteCodeDict = res.value.data;
          this.wasteSub.unsubscribe();
        },
      });
  }

  getEstimateType() {
    this.estimateSub = this.commonService
      .getObservableList4path(
        getModelListPath('EstimateType'),
        columnListPath(GridEnum.EstimateType)
      )
      .subscribe({
        next: (res: ResponseBodyGetList) => {
          this.estimateTypeDict = res.value.data;
          this.estimateSub.unsubscribe();
        },
      });
  }

  getRefreshTable(): void {
    this.refreshTable.emit();
  }
}
