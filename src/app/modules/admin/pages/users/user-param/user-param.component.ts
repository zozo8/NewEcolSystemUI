import { Component, Input, OnDestroy, OnInit} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LazyLoadEvent, MenuItem} from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { BehaviorSubject, Observable } from "rxjs";
import { ITableButtonsComponent } from "src/app/Interfaces/table/ITableButtonsComponent";
import { ITableComponent } from "src/app/Interfaces/table/ITableComponent";
import { ParamDict } from "src/app/models/dto/modules/admin/dictionary/paramDict";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";
import { BaseService } from "src/app/services/base.service";
import { FormDialogComponent } from "src/app/universalComponents/form-dialog/form-dialog.component";
import { TableButtonService } from "src/app/universalComponents/table-button/table-button.service";
import { TableService } from "src/app/universalComponents/table/table.service";

@Component({
  selector: "app-user-param",
  templateUrl: "./user-param.component.html",
  styleUrls: ["./user-param.component.css"],
  providers:[DialogService]
})
export class UserParamComponent implements ITableButtonsComponent, ITableComponent , OnDestroy, OnInit{

  @Input()
  masterId?:number;

  buttons: MenuItem[];
  obj: TableMenuStructure;
  deletePath: string = "/api/UserParams/DeleteUserParam/Delete";
  postPath: string;
  putPath: string;

  getPath: string = "/api/UserParams/GetUserParams/Get";
  columns: RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:10000});
  responseObj: Observable<ResponseBodyGetList>;
  lazyLoadObj:LazyLoadEvent;

  ref:DynamicDialogRef;
  dictionaryPath = "/api/ParamDicts/GetParamDicts/Get";
  columnPath = "/api/ParamDicts/GetParamDictGridData/Get";

  constructor(
    private tableButtonService:TableButtonService,
    private translateService:TranslateService,
    public dialogService:DialogService,
    private baseService:BaseService<ParamDict>,
    private tableService:TableService
  ) {

  }

  ngOnInit(): void {
    this.getColumns();
    this.getButtons();

    this.reqObjBS.subscribe(request=> {
      if(request?.pageNumber !== 10000) {
        this.responseObj = this.baseService.getResponseObj(this.getPath,request);
      }
    });
  }

  ngOnDestroy(): void {
    if(this.ref){
      this.ref.close();
    }
  }

  // Table
  getColumns(): void {
    this.baseService.getColumns(this.columnPath).subscribe({
      next:(res:RequestGridDataColumn)=> {
         this.columns = this.tableService.GetColumnsOutput(res.value);
      }, complete:()=> {
        this.prepareRequest();
      }
  });
  }

  prepareRequest(ev?: LazyLoadEvent): void {
    let requestObj = this.baseService.getRequestObj(this.columns, ev);
    this.reqObjBS.next(requestObj);
  }
  getLazyLoadEvent(ev: LazyLoadEvent): void {
    this.lazyLoadObj = ev;
    this.prepareRequest(this.lazyLoadObj);
  }
  getSelected(ev: any): void {
    throw new Error("Method not implemented.");
  }

  refreshTable():void {
    this.prepareRequest(this.lazyLoadObj);
    this.obj.editState = false;
  }



// tableBuittons
  getButtons(): MenuItem[] {
    return [
      {
        label:this.translateService.instant("btn.add"),
        icon:"pi pi-fw pi-plus",
        disabled:false,
        command:()=>this.post()
      },
      {
        label:this.translateService.instant("btn.remove"),
        icon:"pi pi-fw pi-minus",
        disabled:false,
        command:()=>this.delete()
      },
      {
        label:this.translateService.instant("btn.refresh"),
        icon:"pi pi-fw pi-refresh",
        disabled:false,
        command:()=>this.refresh()
      }
    ];
  }

  post(): void {
        var dictionary = this.baseService.getMenuItemList(this.dictionaryPath, this.columnPath, "id", "paramName");

        this.ref = this.dialogService.open(FormDialogComponent, {
          data:dictionary,
          contentStyle:{"width":"500px"},
          header:this.translateService.instant("dict.header.user_param")
        });

        this.ref.onClose.subscribe((obj:MenuItem)=>{
          if(obj){
            console.log("selected:",obj);
          }
        });
  }

  delete(): void {
    throw new Error("Method not implemented.");
  }
  put(): void {
    throw new Error("Method not implemented.");
  }
  refresh(): void {
    throw new Error("Method not implemented.");
  }



}
