import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardPageComponent } from 'src/app/components/pages/dashboard-page/dashboard-page.component';
import { GridEnum } from 'src/app/models/enums/gridEnum';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { ITableFormComponent } from 'src/app/modules/universal-components/interfaces/ITableFormComponent';
import { RequestGridDataColumnValue } from 'src/app/modules/universal-components/models/requestGridDataColumnValue.model';
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
  implements ITableFormComponent, OnInit, OnDestroy
{
  @Input()
  postPath: string;
  @Input()
  putPath: string;
  @Input()
  cols: RequestGridDataColumnValue[];
  @Input()
  obj: TableMenuStructure;
  @Input()
  icon: string;

  @Output()
  refreshTable = new EventEmitter();

  compsiteSubs = new Subscription();

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
    this.compsiteSubs.add(
      this.commonService
        .getObservableList4path(
          getModelListPath('ProductTradeName'),
          columnListPath(GridEnum.ProductTradeName)
        )
        .subscribe({
          next: (res: ResponseBodyGetList) => {
            this.wasteCodeDict = res.value.data;
          },
        })
    );
  }

  getEstimateType() {
    this.compsiteSubs.add(
      this.commonService
        .getObservableList4path(
          getModelListPath('EstimateType'),
          columnListPath(GridEnum.estimateType)
        )
        .subscribe({
          next: (res: ResponseBodyGetList) => {
            this.estimateTypeDict = res.value.data;
          },
        })
    );
  }

  // openTab(name: string) {
  //   const comp = components4tabs.find(
  //     (x) => x.name.toLowerCase() === name.toLowerCase()
  //   );
  //   if (comp) {
  //     const tab: Tab = {
  //       header: comp.component.header,
  //       active: true,
  //       component: comp.component,
  //       icon: comp.component.icon,
  //       tooltip: comp.component.header,
  //     };
  //     this.dashboard.addTab(tab);
  //   }
  // }

  getRefreshTable(): void {
    this.refreshTable.emit();
  }

  ngOnDestroy(): void {
    this.compsiteSubs.unsubscribe();
  }
}
