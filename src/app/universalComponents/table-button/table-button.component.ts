import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MenuItem } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { FormTableSetColumnComponent } from "../dialogs/form-table-set-column/form-table-set-column.component";

@Component({
  selector: "app-table-button",
  templateUrl: "./table-button.component.html",
  styleUrls: ["./table-button.component.css"],
  providers:[ DialogService ]
})
export class TableButtonComponent implements OnInit {

 @Input()
 buttonList:MenuItem[];

 @Input()
 icon:string;

 @Input()
 model:string;

 @Output()
 selectedColumnList = new EventEmitter<RequestGridDataColumnValue[]>();

 setting:MenuItem[];
 ref:DynamicDialogRef;

  constructor(
    private translateService:TranslateService,
    private dialogService:DialogService
  ) { }

  ngOnInit(): void {
    this.setting = [
      {
        label:this.translateService.instant("table-menu.setting.select_grid"),
        disabled:true
      },
      {
        label:this.translateService.instant("table-menu.setting.select_columns"),
        command:()=>this.selectColumns()
      },
      {
        label:this.translateService.instant("table-menu.setting.save_grid"),
        disabled:true
      }
    ];
  }



  selectColumns():void{
    this.ref = this.dialogService.open(FormTableSetColumnComponent, {
      contentStyle:{"width":"800px"},
      closeOnEscape:true,
      header:this.translateService.instant("table-menu.setting.select_columns"),
      data:[this.model]
    });

    this.ref.onClose.subscribe({
      next:(res:RequestGridDataColumnValue[])=>{
        this.selectedColumnList.emit(res);
      }
    });
  }

}
