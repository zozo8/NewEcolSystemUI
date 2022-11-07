import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITableFormComponent } from 'src/app/modules/universal-components/interfaces/ITableFormComponent';
import { RequestGridDataColumnValue } from 'src/app/modules/universal-components/models/requestGridDataColumnValue.model';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements ITableFormComponent {
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
