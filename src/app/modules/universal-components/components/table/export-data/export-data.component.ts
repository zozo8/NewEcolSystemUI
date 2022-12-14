import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as FileSaver from 'file-saver';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { getDataExport } from 'src/app/services/path';

interface exportOutput {
  data?: any[];
  type?: string;
  title?: string;
  columns?: ResponseGridDataColumnValue[];
}

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss'],
})
export class ExportDataComponent implements OnInit {
  typeOptions: MenuItem[];
  obj: exportOutput = {};
  dataExportSub: Subscription;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private translateService: TranslateService,
    private apiService: ApiService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getTypeOptions();
  }

  getTypeOptions() {
    this.typeOptions = [
      {
        label: this.translateService.instant('table-menu.export.xls'),
        icon: PrimeIcons.FILE_EXCEL,
        id: 'xlsx',
      },
      {
        label: this.translateService.instant('table-menu.export.doc'),
        icon: PrimeIcons.FILE,
        id: 'docx',
        disabled: true,
      },
      {
        label: this.translateService.instant('table-menu.export.pdf'),
        icon: PrimeIcons.FILE_PDF,
        id: 'pdf',
        disabled: true,
      },
    ];
  }

  submit() {
    this.obj.data = this.config.data[0];
    this.obj.columns = this.config.data[1];
    this.obj.title =
      this.obj.title ?? `Exported data ${new Date().toLocaleDateString()}`;

    this.dataExportSub = this.apiService
      .getResponseByPost(getDataExport(), this.obj)
      .subscribe({
        next: (res: any) => {
          const file = this.commonService.getBlobFromBytes(
            res.value.bytes,
            res.value.type
          );
          FileSaver.saveAs(file, res.value.fileName);
          this.dataExportSub.unsubscribe();
          this.ref.close();
        },
      });
  }

  close() {
    this.ref.close();
  }
}
