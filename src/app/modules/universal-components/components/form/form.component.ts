import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { RequestGridDataColumnValue } from 'src/app/modules/universal-components/models/requestGridDataColumnValue.model';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { TableButtonService } from '../table-button/table-button.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  private saveSubscription: Subscription;
  private putSubscription: Subscription;

  constructor(
    private tableButtonService: TableButtonService,
    private translateService: TranslateService
  ) {}

  @Input()
  title?: string;

  @Input()
  icon?: string;

  @Input()
  obj: TableMenuStructure;

  @Input()
  cols: RequestGridDataColumnValue[];

  @Input()
  postPath: string;

  @Output()
  refreshTable = new EventEmitter();

  getFieldName(field: string): string {
    return this.cols.find((x) => x.columnName === field)?.displayName ?? '-';
  }

  save(): void {
    this.saveSubscription = this.tableButtonService
      .save(this.obj.objectEditDto, this.obj.objectEditDto.id, this.postPath)
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
