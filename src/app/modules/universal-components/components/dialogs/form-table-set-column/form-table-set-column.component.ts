import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DndDropEvent } from "ngx-drag-drop";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";

import { BaseService } from "src/app/services/base.service";
import { PathService } from "src/app/services/path.service";
import { FormTableSetColumnService } from "./form-table-set-column.service";

@Component({
  selector: "app-form-table-set-column",
  templateUrl: "./form-table-set-column.component.html",
  styleUrls: ["./form-table-set-column.component.css"]
})
export class FormTableSetColumnComponent implements OnInit {

  availableColumns:RequestGridDataColumnValue[] = [];
  selectedColumns:RequestGridDataColumnValue[] = [];
  draggedColumn:RequestGridDataColumnValue | null;
  title:string;
  gridId:number;

  constructor(
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig,
    private baseService:BaseService,
    private pathService:PathService,
    private translateService:TranslateService,
    private formTableSetColumnService:FormTableSetColumnService,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.gridId = this.config.data[0];
    this.config.data.closeOnEscape = true;
    if(this.gridId) {
      this.getColumns(this.gridId);
    }
  }


  getColumns(gridId:number):void {
    // pobrac ustawienia dla usera i grida, pokazadc jakie kolumny sa ustawione a jakie są do wyboru
    var path = this.pathService.columnList(gridId);
    this.baseService.getColumns(path).subscribe({
      next:(res:RequestGridDataColumn)=> {
        this.availableColumns = res.value.filter(x=>x.isVisible === false);
        this.selectedColumns =  res.value.filter(x=>x.isVisible === true);
      }
    });
  }

  onDragStartAvailableColumns(ev:DragEvent, col:RequestGridDataColumnValue):void {
    this.draggedColumn = col;
  }

  onDropSelectedColumns(ev:DndDropEvent):void {
    if(this.draggedColumn) {
      if(!this.selectedColumns.find(x=>x.columnName === this.draggedColumn?.columnName)) {
        this.draggedColumn.isVisible = true;
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
        this.draggedColumn.isVisible = false;
        this.availableColumns.push(this.draggedColumn);
        var index = this.selectedColumns.findIndex(x=>x.columnName === this.draggedColumn?.columnName);
        this.selectedColumns.splice(index,1);
        this.draggedColumn = null;
      }
    }
  }

  save():void {
   var allColumns = this.availableColumns.concat(this.selectedColumns);
    this.formTableSetColumnService.setColumnByUserIdGridId(this.gridId, allColumns).subscribe({
      next:(res:boolean)=> {
        if(!res) {
          this.messageService.add(
              {severity:"error", summary:this.translateService.instant("table-menu.error"), detail:this.translateService.instant("table-menu.remove_record_error")}
          );
        } else{
          this.ref.close();
        }
      }
    });
  }

  cancel():void {
      this.ref.close();
  }

}