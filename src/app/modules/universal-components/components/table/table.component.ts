import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LazyLoadEvent, MenuItem, PrimeIcons } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, Subscription } from 'rxjs';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { ResponseGridDataColumn } from 'src/app/models/responses/responseGridDataColumn.model';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { columnListPath, getModelListPath } from 'src/app/services/path';
import { FormTableSetColumnComponent } from '../dialogs/form-table-set-column/form-table-set-column.component';
import { ExportDataComponent } from './export-data/export-data.component';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [DialogService],
})
export class TableComponent implements OnInit, OnDestroy {
  dataLoading: boolean;
  cols: ResponseGridDataColumnValue[] = [];
  dataSource: ResponseBodyGetList;
  columnFilter: string[];
  tableSettingItems: MenuItem[];

  dataValues: any[];
  selectedRows: any[] = [];
  summaryValues: any[] = [];
  totalPages: number;
  pageSize: number = 0;
  totalRecords: number = 0;
  ev: LazyLoadEvent;
  totalItems: number;

  multiselectRows: boolean = false;
  multiselectCols: boolean = false;
  summary: boolean = false;

  tableOptions: MenuItem[] = [];
  columnOptions: MenuItem[] = [];

  private columnSub: Subscription;
  private dataSubs: Subscription;

  private compsiteSub = new Subscription();

  @Input()
  set dataTable(v: Observable<ResponseBodyGetList>) {
    if (v !== undefined) {
      this.dataSubs = v.subscribe({
        next: (res: ResponseBodyGetList) => {
          this.dataLoading = true;
          this.dataValues = res.value.data;
          this.totalRecords = res.value.totalItems ?? 0;
          this.totalPages = res.value.totalPages;
          this.pageSize = res.value.pageSize;
          this.totalItems = res.value.totalItems ?? 0;
          this.rebuildSummary();
          this.dataLoading = false;
        },
        complete: () => this.dataSubs.unsubscribe(),
        error: (err: Error) => {
          this.dataLoading = false;
        },
      });
    }
  }

  private _columns: ResponseGridDataColumnValue[];
  public get columns(): ResponseGridDataColumnValue[] {
    return this._columns;
  }

  @Input()
  public set columns(v: ResponseGridDataColumnValue[]) {
    this._columns = v;
    if (this._columns !== undefined) {
      this.columnFilter = this.cols.map((el) => el.columnName);
    }
  }

  @Input()
  height: number;

  @Input()
  tableDisabled: boolean;

  private _gridId: number;
  public get gridId(): number {
    return this._gridId;
  }

  @Input()
  public set gridId(id: number) {
    this._gridId = id;

    this.compsiteSub.add(
      this.apiService.getColumns(columnListPath(id)).subscribe({
        next: (res: ResponseGridDataColumn) => {
          this.columns = this.tableService.GetColumnsOutput(res.value);
        },
        complete: () => {
          this.prepareRequest();
        },
      })
    );
  }

  @Input()
  canMultiselect: boolean;

  @Output()
  newRequestParam = new EventEmitter<LazyLoadEvent>();

  @Output()
  selectedObj = new EventEmitter<any>();

  @Output()
  selectedColumns = new EventEmitter<boolean>();

  constructor(
    private translateService: TranslateService,
    private dialogService: DialogService,
    private apiService: ApiService,
    private tableService: TableService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getTableOptions();
    this.getColumnOptions();
  }

  prepareRequest(ev?: LazyLoadEvent | undefined): void {
    let requestObj = this.commonService.getRequestObj(this.columns, ev);
    this.apiService
      .getResponseBodyGetList(getModelListPath('ProductTradeName'), requestObj)
      .subscribe({
        next: (res: ResponseBodyGetList) => {
          this.dataLoading = true;
          this.dataValues = res.value.data;
          this.totalRecords = res.value.totalItems ?? 0;
          this.totalPages = res.value.totalPages;
          this.pageSize = res.value.pageSize;
          this.totalItems = res.value.totalItems ?? 0;
          this.rebuildSummary();
          this.dataLoading = false;
        },
        complete: () => this.dataSubs.unsubscribe(),
        error: (err: Error) => {
          this.dataLoading = false;
        },
      });
  }

  loadData(event: LazyLoadEvent): void {
    if (event.first !== 0 || event.rows !== 0) {
      //this.newRequestParam.emit(event);
      this.prepareRequest(event);
    }
  }

  selectObj(obj: any): void {
    if (!Array.isArray(obj)) {
      this.selectedObj.emit(obj);
    }
    this.rebuildSummary();
  }

  unselectObj(): void {
    this.rebuildSummary();
  }

  setSummary(): void {
    this.summary = !this.summary;
    this.rebuildSummary();
  }

  rebuildSummary(): void {
    if (this.summary) {
      this.summaryValues = [];
      this.summaryValues.push(this.dataValues[0]);
      let values: number[] = [];
      this.columns.forEach((el, index) => {
        if (el.dataType === 'numeric' || el.dataType === 'float') {
          if (this.selectedRows.length > 0) {
            values = this.selectedRows.map((x) => x[el.columnName]);
          } else {
            values = this.dataValues.map((x) => x[el.columnName]);
          }

          const sumValues = values.reduce((x, y) => {
            return x + y;
          }, 0);

          this.summaryValues[index] = sumValues;
        } else {
          this.summaryValues[index] = 0;
        }
      });
    }
  }

  setMultiselect(): void {
    this.selectedRows = [];
    this.multiselectRows = !this.multiselectRows;
  }

  exportData(): void {
    let exportData = this.multiselectRows
      ? this.selectedRows ?? this.dataValues
      : this.dataValues;

    const ref = this.dialogService.open(ExportDataComponent, {
      contentStyle: { width: '40rem' },
      header: this.translateService.instant('table-menu.export.title'),
      closeOnEscape: true,
      data: [exportData, this.columns],
    });

    this.columnSub = ref.onClose.subscribe({
      next: () => {
        exportData = [];
        this.columnSub.unsubscribe();
      },
    });
  }

  getTableOptions(): void {
    this.tableOptions = [
      {
        icon: PrimeIcons.CHECK_SQUARE,
        label: this.translateService.instant(
          'table-menu.options.multiselect_records'
        ),
        command: () => this.setMultiselect(),
        visible: this.canMultiselect ?? false,
      },
      {
        icon: PrimeIcons.TAGS,
        label: this.translateService.instant('table-menu.options.summary'),
        command: () => this.setSummary(),
      },
      {
        icon: PrimeIcons.CHECK_CIRCLE,
        label: this.translateService.instant(
          'table-menu.options.multiselect_columns'
        ),
        command: () => (this.multiselectCols = !this.multiselectCols),
        visible: false,
      },
      {
        icon: PrimeIcons.FILE,
        label: this.translateService.instant('table-menu.export.title'),
        command: () => this.exportData(),
      },
    ];
  }

  getColumnOptions(): void {
    this.columnOptions = [
      {
        label: this.translateService.instant('table-menu.setting.select_grid'),
        disabled: true,
      },
      {
        label: this.translateService.instant(
          'table-menu.setting.select_columns'
        ),
        command: () => this.selectColumns(),
      },
      {
        label: this.translateService.instant('table-menu.setting.save_grid'),
        disabled: true,
      },
    ];
  }

  selectColumns(): void {
    const ref = this.dialogService.open(FormTableSetColumnComponent, {
      contentStyle: { width: '800px' },
      closeOnEscape: true,
      header: this.translateService.instant(
        'table-menu.setting.select_columns'
      ),
      data: [this.gridId, this.columns],
    });

    this.columnSub = ref.onClose.subscribe({
      next: (res: boolean) => {
        if (res) {
          this.selectedColumns.emit(res);
        }
        this.columnSub.unsubscribe();
      },
    });
  }

  ngOnDestroy(): void {
    this.compsiteSub.unsubscribe();
  }
}
