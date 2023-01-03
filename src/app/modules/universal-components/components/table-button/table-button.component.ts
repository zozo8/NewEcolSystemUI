import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { deleteModelPath } from 'src/app/services/path';
import { TableMenuStructure } from '../../models/tableMenuStructure.model';

@Component({
  selector: 'app-table-button',
  templateUrl: './table-button.component.html',
  styleUrls: ['./table-button.component.css'],
  providers: [DialogService],
})
export class TableButtonComponent {
  private _buttonList: MenuItem[];
  private deleteSub: Subscription;

  // deprecated
  public get buttonList(): MenuItem[] {
    return this._buttonList;
  }

  // deprecated
  @Input()
  public set buttonList(v: MenuItem[]) {
    this._buttonList = v;
  }

  @Input()
  icon: string;

  @Input()
  gridId: number;

  @Output()
  refreshTable = new EventEmitter();

  setting: MenuItem[];
  ref: DynamicDialogRef;

  constructor(
    private translateService: TranslateService,
    private confirmationService: ConfirmationService,
    private apiService: ApiService,
    private commonService: CommonService
  ) {}

  post(obj: TableMenuStructure): TableMenuStructure {
    obj.editState = true;
    obj.submitValue = this.translateService.instant('btn.add');
    obj.objectDto = {};
    obj.objectEditDto = {};
    return obj;
  }

  put(obj: TableMenuStructure): TableMenuStructure {
    if (obj.objectEditDto?.id !== null) {
      obj.editState = true;
      obj.submitValue = this.translateService.instant('btn.save');
    } else {
      this.commonService.getMessageToastBySeverity(
        'warn',
        this.translateService.instant('table-menu.select_record')
      );
    }

    return obj;
  }

  delete(model: string, id?: number): void {
    if (!id) {
      this.commonService.getMessageToastBySeverity(
        'error',
        this.translateService.instant('table-menu.remove_without_id')
      );
    }

    const path: string = deleteModelPath(model, id ?? 0);
    this.confirmationService.confirm({
      message: this.translateService.instant(
        'table-menu.remove_record_question'
      ),
      accept: () => {
        this.deleteSub = this.apiService.getResponseByDelete(path).subscribe({
          complete: () => {
            this.commonService.getMessageToastBySeverity(
              'success',
              this.translateService.instant('table-menu.remove_record_success')
            );
            this.refreshTable.emit();
            this.deleteSub.unsubscribe();
          },
          error: (er: HttpErrorResponse) => {
            this.commonService.getMessageToastBySeverity(
              'error',
              er.error?.Errors[0]?.Message
            );
          },
        });
      },
    });
  }
}
