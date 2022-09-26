import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LazyLoadEvent, MenuItem } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { BehaviorSubject, Observable } from "rxjs";
import { IDictionaryComponent } from "src/app/Interfaces/IDictionaryComponent";
import { ITableButtonsComponent } from "src/app/Interfaces/table/ITableButtonsComponent";
import { ITableComponent } from "src/app/Interfaces/table/ITableComponent";
import { UserUserGroup } from "src/app/models/dto/modules/admin/userUserGroup";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";
import { BaseService } from "src/app/services/base.service";
import { FormDictionaryValueDialogComponent } from "src/app/universalComponents/dialogs/form-dictionary-value-dialog/form-dictionary-value-dialog.component";
import { TableButtonService } from "src/app/universalComponents/table-button/table-button.service";
import { TableService } from "src/app/universalComponents/table/table.service";

@Component({
  selector: "app-user-group",
  templateUrl: "./user-group.component.html",
  styleUrls: ["./user-group.component.css"],
  providers: [DialogService]
})
export class UserGroupComponent implements OnInit, ITableButtonsComponent, IDictionaryComponent, ITableComponent, OnDestroy {

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
  deletePath: string = "/api/UserGroups/DeleteUserGroup/Delete";
  postPath: string = "/api/UserGroups/ManageUserGroup/Post";
  putPath: string;

  columnPath: string = "/api/UserGroups/GetUserGroupGridData/Get";
  getPath: string = "/api/UserGroups/GetUserGroups/Get";
  columns: RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:10000});
  responseObj: Observable<ResponseBodyGetList>;
  lazyLoadObj: LazyLoadEvent;
  selectedId: number;

  dictionaryColumnPath: string = "/api/UserGroups/GetUserGroupGridData/Get";
  dictionaryPath: string = "/api/UserGroups/GetUserGroups/Get";
  ref: DynamicDialogRef;

  constructor(
    private translateService:TranslateService,
    private baseService:BaseService,
    private dialogService:DialogService,
    private tableButtonService:TableButtonService,
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
    if(this.ref) {
      this.ref.close();
    }
  }

  getColumns(): void {
    this.baseService.getColumns(this.columnPath).subscribe({
      next:(res:RequestGridDataColumn)=> {
         this.columns = this.tableService.GetColumnsOutput(res.value);
      }, complete:()=> {
        this.prepareRequest();
      }
  });
  }
  prepareRequest(ev?: LazyLoadEvent | undefined): void {
    if(this.columns) {
      let filter = this.baseService.getFilter4request("userId",this.masterId?.toString()??"","Equal");
      let requestObj = this.baseService.getRequestObj(this.columns, ev,undefined, [filter]);
      this.reqObjBS.next(requestObj);
    }
  }
  getLazyLoadEvent(ev: LazyLoadEvent): void {
    this.lazyLoadObj = ev;
    this.prepareRequest(this.lazyLoadObj);
  }
  getSelected(ev: any): void {
    if(ev) {
      this.selectedId = ev.data.id;
    }
  }

  // -----

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
    let obj:UserUserGroup = {
      id:0,
      userId:this.masterId,
      userGroupId:0
    };

    this.ref = this.dialogService.open(FormDictionaryValueDialogComponent, {
      data:[
          [this.dictionaryPath, this.dictionaryColumnPath, "id", "groupName"],
          this.postPath,
          obj,
          ["userGroupId"],
          false],
      contentStyle:{"width":"500px"},
      header:this.translateService.instant("dict.header.user_param")
    });

    this.ref.onClose.subscribe({next:(res:boolean)=> {
        if(res) {
          this.refreshTable();
        }
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

  refreshTable(): void {
    this.prepareRequest(this.lazyLoadObj);
  }

}
