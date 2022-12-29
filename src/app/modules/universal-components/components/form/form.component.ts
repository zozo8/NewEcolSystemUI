import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ResponseGridDataColumn } from 'src/app/models/responses/responseGridDataColumn.model';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { ApiService } from 'src/app/services/api.service';
import { columnListPath } from 'src/app/services/path';
import { TableButtonService } from '../table-button/table-button.service';
import { TableService } from '../table/table.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  columns: ResponseGridDataColumnValue[];
  columnsSub: Subscription;

  private saveSubscription: Subscription;
  private putSubscription: Subscription;

  constructor(
    private tableButtonService: TableButtonService,
    private translateService: TranslateService,
    private apiService: ApiService,
    private tableService: TableService
  ) {}

  @Input()
  title?: string;

  @Input()
  icon?: string;

  @Input()
  obj: TableMenuStructure;

  // @Input()
  // cols: ResponseGridDataColumnValue[];

  @Input()
  postPath: string;

  @Input()
  public set gridId(id: number) {
    this.getColumns(id);
  }

  @Output()
  refreshTable = new EventEmitter();

  getFieldName(field: string): string {
    return this.columns.find((x) => x.columnName === field)?.displayName ?? '-';
  }

  getColumns(id: number) {
    this.columnsSub = this.apiService.getColumns(columnListPath(id)).subscribe({
      next: (res: ResponseGridDataColumn) => {
        this.columns = this.tableService.GetColumnsOutput(res.value);
      },
      complete: () => {
        this.columnsSub.unsubscribe();
      },
    });
  }

  save(): void {
    this.saveSubscription = this.tableButtonService
      .save(this.postPath, this.obj.objectEditDto, this.obj.objectEditDto.id)
      .subscribe({
        next: (res: boolean) => {
          if (res) {
            this.refreshTable.emit();
          }
        },
        complete: () => this.saveSubscription.unsubscribe(),
      });
  }

  edit(): void {
    this.putSubscription = this.tableButtonService.put(this.obj).subscribe({
      next: (res: TableMenuStructure) => (this.obj = res),
      complete: () => this.putSubscription.unsubscribe(),
    });
  }

  cancel(): void {
    this.obj.editState = false;
    this.obj.objectEditDto = {};
  }
}
