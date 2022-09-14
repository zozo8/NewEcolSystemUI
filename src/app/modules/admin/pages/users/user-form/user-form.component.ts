import { Component, EventEmitter, Input,Output } from "@angular/core";
import { ITableFormComponent } from "src/app/Interfaces/table/ITableFormComponent";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";
import { TableMenuService } from "src/app/universalComponents/table-menu/table-menu.service";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrls: ["./user-form.component.css"]
})
export class UserFormComponent implements ITableFormComponent {
  @Input()
  addPath:string;

  @Input()
  editPath:string;

  @Input()
  cols:RequestGridDataColumnValue[];

  @Input()
  obj:TableMenuStructure;

  @Output()
  refreshTable = new EventEmitter();

  constructor(
    private tableMenuService:TableMenuService
  ) { }


  edit():void {
    this.tableMenuService.edit(this.obj).subscribe({
      next:(res:TableMenuStructure)=>this.obj = res
    });
  }

  save():void {
    this.tableMenuService.save(this.obj.objectEditDto,this.obj.objectEditDto.id,this.addPath, this.editPath).subscribe({
      next:(res:boolean)=> {
        if(res) {
          this.refreshTable.emit();
        }
      }
    });
  }

  cancel():void {
    this.obj.editState = false;
    this.obj.objectEditDto = {};
  }

  getFieldName(field:string):string {
    return this.cols.find(x=>x.columnName === field)?.displayName??"-";
  }

}
