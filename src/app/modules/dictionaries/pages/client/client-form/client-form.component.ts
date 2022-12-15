import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { ITableFormComponent } from 'src/app/modules/universal-components/interfaces/ITableFormComponent';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit, ITableFormComponent {
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

  ngOnInit(): void {}

  getRefreshTable(): void {
    this.refreshTable.emit();
  }
}
