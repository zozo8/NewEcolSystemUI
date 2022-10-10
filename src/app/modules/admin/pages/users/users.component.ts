import { Component, OnInit} from "@angular/core";
import { LazyLoadEvent, MenuItem } from "primeng/api";
import { BehaviorSubject, Observable,tap} from "rxjs";
import { ITableComponent } from "src/app/Interfaces/table/ITableComponent";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { TableService } from "src/app/universalComponents/table/table.service";
import { TranslateService } from "@ngx-translate/core";
import { TableButtonService } from "src/app/universalComponents/table-button/table-button.service";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";
import { DashboardMenuService } from "src/app/components/pages/dashboard-page/dashboard-menu.service";
import { BaseService } from "src/app/services/base.service";
import { ITableButtonsComponent } from "src/app/Interfaces/table/ITableButtonsComponent";
import { User } from "src/app/models/dto/modules/admin/user";
import { PathService } from "src/app/services/path.service";
import { IMasterPage } from "src/app/Interfaces/IMasterPage";
import { GridEnum } from "src/app/utils/gridEnum";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})


export class UsersComponent implements OnInit, ITableComponent, ITableButtonsComponent, IMasterPage {

  breadcrumbList:MenuItem[];
  obj:TableMenuStructure = new TableMenuStructure();
  lazyLoadObj:LazyLoadEvent;
  responseObj:Observable<ResponseBodyGetList>;
  columns:RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:10000});
  selectedId: number;
  postPath: string;
  putPath: string;
  gridId:number = GridEnum.Users;

  model= User.name;
  buttons:MenuItem[];


  availableColumns:RequestGridDataColumnValue[];
  selectedColumns:RequestGridDataColumnValue[];
  draggedColumn?:RequestGridDataColumnValue;

  constructor(
   private tableService:TableService,
   private translateService:TranslateService,
   private tableButtonService:TableButtonService,
   private dashboardMenuService:DashboardMenuService,
   private baseService:BaseService,
   private pathService:PathService
  ) {
    this.postPath = pathService.post(this.model);
    this.putPath = pathService.put(this.model);
  }

  ngOnInit(): void {
    this.getColumns();
    this.getButtons();
    this.breadcrumbList = this.baseService.getBreadcrumb("users");

    // ustawiam nasłuchiwanie aby przy zmianie BS odpalił getResponseObj i zasilił tabele z danymi
    this.reqObjBS.subscribe(request=> {
      if(request?.pageNumber !== 10000) {
        this.responseObj = this.baseService.getResponseObj(this.pathService.getList(this.model),request);
      }
    });
  }

  getColumns():void {
     this.baseService.getColumns(this.pathService.columnList(this.gridId)).subscribe({
      next:(res:RequestGridDataColumn)=> {
         this.columns = this.tableService.GetColumnsOutput(res.value);
      }, complete:()=> {
        this.prepareRequest();
      }
  });
  }

  prepareRequest(ev?:LazyLoadEvent):void {
    let requestObj = this.baseService.getRequestObj(this.columns, ev);
    this.reqObjBS.next(requestObj);
  }

// emmiter from table components
  getLazyLoadEvent(ev:LazyLoadEvent):void {
    this.lazyLoadObj = ev;
    this.prepareRequest(this.lazyLoadObj);
  }

  getSelected(id:number):void {
    if(id != null) {
      var path = this.pathService.get(this.model,id);
      this.selectedId = id;

      this.tableService.getObjDto(path,this.obj);
      // this.tableService.getObjDto(path).subscribe({
      //   next:(res:TableMenuStructure)=>this.obj = res
      // });
    }
  }

  getSelectedColumns(cols:RequestGridDataColumnValue[]):void{
    this.columns = cols;
    this.prepareRequest(this.lazyLoadObj);
  }

  //emmiter from detail component
  refreshTable():void {
    this.prepareRequest(this.lazyLoadObj);
    this.obj.editState = false;
  }


  // buttons

  getButtons():MenuItem[] {
    return this.buttons =
    [
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
        label:this.translateService.instant("btn.edit"),
        icon:"pi pi-fw pi-pencil",
        disabled:false,
        command:()=>this.put()
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
    this.tableButtonService.post(this.obj).subscribe({
      next:(res:TableMenuStructure)=>this.obj = res
    });
  }

  put(): void {
    this.tableButtonService.put(this.obj).subscribe({
      next:(res:TableMenuStructure)=>this.obj = res
    });
  }

  delete(): void {
      this.tableButtonService.delete(this.pathService.delete(this.model, this.obj.objectDto.id)).subscribe({
        next:(res:boolean)=> {
          if(res) { this.refreshTable(); }
        }
      });
    }
}


