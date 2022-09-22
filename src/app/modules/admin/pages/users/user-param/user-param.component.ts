import { Component, Input, OnDestroy, OnInit} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LazyLoadEvent, MenuItem} from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { BehaviorSubject, Observable } from "rxjs";
import { IDictionaryComponent } from "src/app/Interfaces/IDictionaryComponent";
import { ITableButtonsComponent } from "src/app/Interfaces/table/ITableButtonsComponent";
import { ITableComponent } from "src/app/Interfaces/table/ITableComponent";
import { ParamDict } from "src/app/models/dto/modules/admin/dictionary/paramDict";
import { Filter } from "src/app/models/requests/filter.model";
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
export class UserParamComponent implements ITableButtonsComponent, ITableComponent , IDictionaryComponent, OnDestroy, OnInit{

  private _masterId: number;
  public get masterId(): number {
    return this._masterId;
  }
  @Input()
  public set masterId(v:number) {
    this._masterId = v;
    this.prepareRequest();
  }


  buttons: MenuItem[];
  obj: TableMenuStructure;
  deletePath: string = "/api/UserParams/DeleteUserParam/Delete";
  postPath: string = "/api/UserParams/ManageUserParam/Post";
  putPath: string;

  getPath: string = "/api/UserParams/GetUserParams/Get";
  columnPath = "/api/UserParams/GetUserParamGridData/Get";
  columns: RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:10000});
  responseObj: Observable<ResponseBodyGetList>;
  lazyLoadObj:LazyLoadEvent;
  selectedId: number;

  ref:DynamicDialogRef;

  dictionaryPath = "/api/ParamDicts/GetParamDicts/Get";
  dictionaryColumnPath = "/api/ParamDicts/GetParamDictGridData/Get";

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

    if(this.columns){
      // xxx zmiana
      let filters:Filter[] = [{
        field:"userId",
        value:this.masterId?.toString()??"",
        comparision:"Equal"
      }];

      let requestObj = this.baseService.getRequestObj(this.columns, ev,undefined, filters);
      this.reqObjBS.next(requestObj);
    }
  }
  getLazyLoadEvent(ev: LazyLoadEvent): void {
    this.lazyLoadObj = ev;
    this.prepareRequest(this.lazyLoadObj);
  }

  getSelected(ev: any): void {
    if(ev){
      this.selectedId = ev.data.id;
      console.log(this.selectedId);
    }
  }

  refreshTable():void {
    this.prepareRequest(this.lazyLoadObj);
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
        command:()=>this.refreshTable()
      }
    ];
  }

  post(): void {
        var dictionary = this.baseService.getMenuItemList(this.dictionaryPath, this.dictionaryColumnPath, "id", "paramName");

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
    this.tableButtonService.delete(this.deletePath, this.selectedId).subscribe({
      next:(res:boolean)=> {
        if(res) { this.refreshTable(); }
      }
    });
  }
  put(): void {
    throw new Error("Method not implemented.");
  }

}
