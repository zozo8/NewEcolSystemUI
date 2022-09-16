import { Component, EventEmitter, Input,OnInit,Output } from "@angular/core";
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



}
