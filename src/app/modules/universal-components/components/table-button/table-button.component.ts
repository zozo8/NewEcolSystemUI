import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Filter } from 'src/app/models/requests/filter.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import {
  columnListPath,
  deleteModelPath,
  getModelListPath,
  postModelPath,
} from 'src/app/services/path';
import { TableMenuStructure } from '../../models/tableMenuStructure.model';
import { FormDictionaryValueDialogComponent } from '../dialogs/form-dictionary-value-dialog/form-dictionary-value-dialog.component';

@Component({
  selector: 'app-table-button',
  templateUrl: './table-button.component.html',
  styleUrls: ['./table-button.component.css'],
  providers: [DialogService],
})
export class TableButtonComponent {
  postModalSub: Subscription;

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
    private commonService: CommonService,
    private dialogService: DialogService
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

  // MODAL

  //dorobic wersje put
  postModal(
    obj: any,
    model: string,
    dictModel: string,
    dictGridId: number,
    value: string, // example id
    label: string, //example name
    objDictId: string, // where add sleected value,
    valueMode?: boolean, // must write value to selected id dictionary,
    filter?: Filter[]
  ): void {
    this.ref = this.dialogService.open(FormDictionaryValueDialogComponent, {
      data: [
        [getModelListPath(dictModel), columnListPath(dictGridId), value, label],
        postModelPath(model),
        obj,
        [objDictId],
        filter,
        valueMode,
      ],
      contentStyle: { width: '600px' },
      header: this.translateService.instant('dict.select_value'),
    });

    this.postModalSub = this.ref.onClose.subscribe({
      next: (res: boolean) => {
        if (res) {
          this.refreshTable.emit();
          this.postModalSub.unsubscribe();
        }
      },
    });
  }
}
