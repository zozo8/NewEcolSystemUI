import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DndDropEvent } from "ngx-drag-drop";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";

import { BaseService } from "src/app/services/base.service";
import { PathService } from "src/app/services/path.service";

@Component({
  selector: "app-form-table-set-column",
  templateUrl: "./form-table-set-column.component.html",
  styleUrls: ["./form-table-set-column.component.scss"]
})
export class FormTableSetColumnComponent implements OnInit {

  availableColumns:RequestGridDataColumnValue[];
  selectedColumns:RequestGridDataColumnValue[];
  draggedColumn:RequestGridDataColumnValue | null;
  title:string;

  constructor(
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig,
    private baseService:BaseService,
    private pathService:PathService,
    private translateService:TranslateService
  ) { }

  ngOnInit(): void {
    var model = this.config.data[0];
    this.config.data.closeOnEscape = true;
    if(model) {
      this.getColumns(model);
    }
  }


  getColumns(model:string):void {
    var path = this.pathService.columnList(model);
    this.baseService.getColumns(path).subscribe({
      next:(res:RequestGridDataColumn)=> {
        this.availableColumns = res.value;
        this.selectedColumns = [];
      }
    });
  }

  onDragStartAvailableColumns(ev:DragEvent, col:RequestGridDataColumnValue):void {
    this.draggedColumn = col;
  }

  onDropSelectedColumns(ev:DndDropEvent):void {
    if(this.draggedColumn) {
      if(!this.selectedColumns.find(x=>x.columnName === this.draggedColumn?.columnName)) {
        this.selectedColumns.push(this.draggedColumn);
        var index = this.availableColumns.findIndex(x=>x.columnName === this.draggedColumn?.columnName);
        this.availableColumns.splice(index,1);
        this.draggedColumn = null;
      }
    }
  }

  onDragStartSelectedColumns(ev:DragEvent, col:RequestGridDataColumnValue):void {
    this.draggedColumn = col;
  }

  onDropAvailableColumns(ev:DndDropEvent):void {
    if(this.draggedColumn) {
      if(!this.availableColumns.find(x=>x.columnName === this.draggedColumn?.columnName)) {
        this.availableColumns.push(this.draggedColumn);
        var index = this.selectedColumns.findIndex(x=>x.columnName === this.draggedColumn?.columnName);
        this.selectedColumns.splice(index,1);
        this.draggedColumn = null;
      }
    }
  }

  save():void {
    this.ref.close(this.selectedColumns);
  }

  cancel():void {
      this.ref.close();
  }

}
