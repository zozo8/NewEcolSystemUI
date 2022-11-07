import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITableFormComponent } from 'src/app/modules/universal-components/interfaces/ITableFormComponent';
import { RequestGridDataColumnValue } from 'src/app/modules/universal-components/models/requestGridDataColumnValue.model';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';

@Component({
  selector: 'app-product-trade-name-form',
  templateUrl: './product-trade-name-form.component.html',
  styleUrls: ['./product-trade-name-form.component.css'],
})
export class ProductTradeNameFormComponent implements ITableFormComponent {
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

  constructor() {}

  getRefreshTable(): void {
    this.refreshTable.emit();
  }
}
