import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FileSaverService } from 'ngx-filesaver';
import { LazyLoadEvent, MenuItem, PrimeIcons } from 'primeng/api';
import { Observable } from 'rxjs';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { RequestGridDataColumnValue } from 'src/app/modules/universal-components/models/requestGridDataColumnValue.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  dataLoading: boolean;
  cols: RequestGridDataColumnValue[] = [];
  dataSource: ResponseBodyGetList;
  columnFilter: string[];
  tableSettingItems: MenuItem[];

  dataValues: any[];
  totalPages: number;
  pageSize: number = 0;
  totalRecords: number = 0;
  ev: LazyLoadEvent;

  totalItems: number;
  exportOptions: MenuItem[] = [];

  @Input()
  set dataTable(v: Observable<ResponseBodyGetList>) {
    if (v !== undefined) {
      this.dataLoading = true;

      v.subscribe({
        next: (res: ResponseBodyGetList) => {
          this.dataSource = res;
        },
        complete: () => {
          this.dataValues = this.dataSource.value.data;
          this.totalRecords = this.dataSource.value.totalItems ?? 0;
          this.totalPages = this.dataSource.value.totalPages;
          this.pageSize = this.dataSource.value.pageSize;
          this.dataLoading = false;
          this.totalItems = this.dataSource.value.totalItems ?? 0;
        },
        error: (err: Error) => {
          this.dataLoading = false;
        },
      });
    }
  }

  private _columns: RequestGridDataColumnValue[];
  public get columns(): RequestGridDataColumnValue[] {
    return this._columns;
  }

  @Input()
  public set columns(v: RequestGridDataColumnValue[]) {
    this._columns = v;
    if (this._columns !== undefined) {
      this.columnFilter = this.cols.map((el) => el.columnName);
    }
  }

  @Input()
  height: number;

  @Input()
  tableDisabled: boolean;

  @Output()
  newRequestParam = new EventEmitter<LazyLoadEvent>();

  @Output()
  selectedObj = new EventEmitter<any>();

  constructor(
    private translateService: TranslateService,
    private fileSaverService: FileSaverService
  ) {}

  ngOnInit(): void {
    this.getExportOptions();
  }

  loadData(event: LazyLoadEvent): void {
    if (event.first !== 0 || event.rows !== 0) {
      if (event.sortField === undefined) {
        event.sortField = 'id';
        event.sortOrder = -1;
      }

      this.newRequestParam.emit(event);
    }
  }

  selectObj(obj: any): void {
    this.selectedObj.emit(obj);
  }

  getExportOptions(): void {
    this.exportOptions = [
      {
        icon: PrimeIcons.FILE,
        label: this.translateService.instant('table-menu.export.doc'),
        command: () => this.exportToDoc(),
        disabled: true,
      },
      {
        icon: PrimeIcons.FILE_EXCEL,
        label: this.translateService.instant('table-menu.export.xls'),
        command: () => this.exportToExcel(),
      },
      {
        icon: PrimeIcons.FILE_PDF,
        label: this.translateService.instant('table-menu.export.pdf'),
        command: () => this.exportToPdf(),
        disabled: true,
      },
    ];
  }

  exportToPdf(): void {
    throw new Error('Method not implemented.');
  }
  exportToExcel(): void {
    var data = this.dataValues;
    import('xlsx').then((x) => {
      const worksheet = x.utils.json_to_sheet(data);
      const workbook = {
        Sheets: {
          data: worksheet,
        },
        SheetNames: [this.translateService.instant('table-menu.export.data')],
      };
      const excelBuffer: any = x.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });

      //this.saveAsExcelFile(excelBuffer, 'Dane w excel');
      this.fileSaver(excelBuffer, 'Dane w excel - zmiana nazwy bedzie');
    });
  }
  exportToDoc(): void {
    throw new Error('Method not implemented.');
  }

  fileSaver(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });

    this.fileSaverService.save(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });

      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
}
