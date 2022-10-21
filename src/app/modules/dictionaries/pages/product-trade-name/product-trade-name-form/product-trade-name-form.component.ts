import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ITableFormComponent } from "src/app/Interfaces/table/ITableFormComponent";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";

@Component({
  selector: "app-product-trade-name-form",
  templateUrl: "./product-trade-name-form.component.html",
  styleUrls: ["./product-trade-name-form.component.css"]
})
export class ProductTradeNameFormComponent implements ITableFormComponent {

  @Input()
  postPath: string;
  @Input()
  putPath: string;
  @Input()
  cols: RequestGridDataColumnValue[];
  @Input()
  obj: TableMenuStructure;
  @Input()
  icon: string;

  @Output()
  refreshTable = new EventEmitter();

  constructor() { }

  getRefreshTable():void{
    this.refreshTable.emit();
  }



}
