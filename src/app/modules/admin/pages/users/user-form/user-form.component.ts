import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITableFormComponent } from 'src/app/Interfaces/table/ITableFormComponent';
import { RequestGridDataColumnValue } from 'src/app/models/requests/requestGridDataColumnValue.model';
import { TableMenuStructure } from 'src/app/models/tableMenuStructure';

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
