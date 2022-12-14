import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { ITableFormComponent } from 'src/app/modules/universal-components/interfaces/ITableFormComponent';
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
  cols: ResponseGridDataColumnValue[];

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
