import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ResponseColumnSettingValueData } from 'src/app/models/responses/columns/responseColumnSettingValueData';
import { FormTableSetColumnService } from './form-table-set-column.service';

@Component({
  selector: 'app-form-table-set-column',
  templateUrl: './form-table-set-column.component.html',
  styleUrls: ['./form-table-set-column.component.scss'],
})
export class FormTableSetColumnComponent implements OnInit {
  availableColumns: ResponseColumnSettingValueData[] = [];
  selectedColumns: ResponseColumnSettingValueData[] = [];
  draggedColumn: ResponseColumnSettingValueData | null;

  title: string;
  gridId: number;
  saveColumnSub: Subscription;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private translateService: TranslateService,
    private formTableSetColumnService: FormTableSetColumnService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.gridId = this.config.data[0];
    this.config.data.closeOnEscape = true;
    const cols: ResponseColumnSettingValueData[] = this.config.data[1];
    this.availableColumns = cols.filter((x) => x.isVisible === false);
    this.selectedColumns = cols.filter((x) => x.isVisible === true);
  }

  save(): void {
    this.availableColumns.forEach((col) => {
      col.isVisible = false;
    });

    this.selectedColumns.forEach((col) => {
      col.isVisible = true;
    });

    var allColumns = this.availableColumns.concat(this.selectedColumns);

    this.saveColumnSub = this.formTableSetColumnService
      .setColumnByUserIdGridId(this.gridId, allColumns)
      .subscribe({
        next: (res: boolean) => {
          if (!res) {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant('table-menu.error'),
              detail: this.translateService.instant(
                'table-menu.set_column_error'
              ),
            });
            this.ref.close(false);
          } else {
            this.messageService.add({
              severity: 'success',
              summary: this.translateService.instant('table-menu.success'),
              detail: this.translateService.instant(
                'table-menu.set_column_success'
              ),
            });
            this.ref.close(true);
          }
        },
        complete: () => this.saveColumnSub.unsubscribe(),
      });
  }

  cancel(): void {
    this.ref.close();
  }
}
