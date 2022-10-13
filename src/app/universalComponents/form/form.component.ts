import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";
import { TableButtonService } from "../table-button/table-button.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent {

  constructor(
    private tableButtonService:TableButtonService
  ) {
  }

  @Input()
  title?:string;

  @Input()
  icon?:string;

  @Input()
  obj:TableMenuStructure;

  @Input()
  cols:RequestGridDataColumnValue[];

  @Input()
  postPath:string;

  @Output()
  refreshTable = new EventEmitter();


  getFieldName(field:string):string {
    return this.cols.find(x=>x.columnName === field)?.displayName??"-";
  }

  save():void {
    this.tableButtonService.save(this.obj.objectEditDto,this.obj.objectEditDto.id,this.postPath).subscribe({
      next:(res:boolean)=> {
        if(res) {
          this.refreshTable.emit();
        }
      }
    });
  }

  edit():void {
    this.tableButtonService.put(this.obj).subscribe({
      next:(res:TableMenuStructure)=>this.obj = res
    });
  }

  cancel():void {
    this.obj.editState = false;
    this.obj.objectEditDto = {};
  }



}
