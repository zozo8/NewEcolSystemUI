import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

interface exportOutput {
  data?: any[];
  type?: string;
  title?: string;
}

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss'],
})
export class ExportDataComponent implements OnInit {
  typeOptions: MenuItem[];
  obj: exportOutput = {};

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.getTypeOptions();
  }

  getTypeOptions() {
    this.typeOptions = [
      {
        label: this.translateService.instant('table-menu.export.xls'),
        icon: PrimeIcons.FILE_EXCEL,
        id: 'xls',
      },
      {
        label: this.translateService.instant('table-menu.export.doc'),
        icon: PrimeIcons.FILE,
        id: 'doc',
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
    this.obj.title =
      this.obj.title ?? `Exported data ${new Date().toLocaleDateString()}`;

    console.log('output obj:', this.obj);
    this.ref.close();
  }

  close() {
    this.ref.close();
  }
}
