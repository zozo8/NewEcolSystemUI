import { Component, OnInit} from "@angular/core";
import { LazyLoadEvent, MenuItem } from "primeng/api";
import { BehaviorSubject, Observable} from "rxjs";
import { ITableComponent } from "src/app/Interfaces/table/ITableComponent";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { TableService } from "src/app/universalComponents/table/table.service";
import { TranslateService } from "@ngx-translate/core";
import { User } from "src/app/models/dto/modules/admin/user";
import { TableButtonService } from "src/app/universalComponents/table-button/table-button.service";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";
import { DashboardMenuService } from "src/app/components/pages/dashboard-page/dashboard-menu.service";
import { BaseService } from "src/app/services/base.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
  providers:[]
})


export class UsersComponent implements OnInit, ITableComponent {
  columnPath = "/api/Users/GetUserGridData/Get";
  getPath = "/api/Users/GetUsers/Get";
  deletePath = "/api/Users/DeleteUser/Delete?id=";
  postPath = "/api/Users/ManageUser/Post";
  putPath = "/api/Users/ManageUser/Put";
  breadcrumbList:MenuItem[];

  obj:TableMenuStructure = new TableMenuStructure();
  lazyLoadObj:LazyLoadEvent;
  responseObj:Observable<ResponseBodyGetList>;
  columns:RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:10000});

  buttons:MenuItem[];

  constructor(
   private tableService:TableService,
   private translateService:TranslateService,
   private tableButtonService:TableButtonService,
   private dashboardMenuService:DashboardMenuService,
   private baseService:BaseService<User>
  ) {
  }

  ngOnInit(): void {
    this.getColumns();
    this.buttons = this.getButtons();
    this.breadcrumbList = this.dashboardMenuService.getMainMenu();

    // ustawiam nasłuchiwanie aby przy zmianie BS odpalił getResponseObj i zasilił tabele z danymi
    this.reqObjBS.subscribe(request=> {
      if(request?.pageNumber !== 10000) {
        this.responseObj = this.baseService.getResponseObj(this.getPath,request);
      }
    });
  }

  getColumns():void {
     this.baseService.getColumns(this.columnPath).subscribe({
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

  getSelected(ev:any):void {
    if(ev.data != null) {
      this.obj.objectDto = ev.data;
      this.obj.objectEditDto = {...ev.data}; // copy without reference
    }
  }

  //emmiter from detail component
  refreshTable():void {
    this.prepareRequest(this.lazyLoadObj);
    this.obj.editState = false;
  }


  // buttons

  getButtons():MenuItem[] {
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
        label:this.translateService.instant("btn.edit"),
        icon:"pi pi-fw pi-pencil",
        disabled:false,
        command:()=>this.put()
      },
      {
        label:this.translateService.instant("btn.refresh"),
        icon:"pi pi-fw pi-refresh",
        disabled:false,
        command:()=>this.prepareRequest(this.lazyLoadObj)
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
      this.tableButtonService.delete(this.deletePath, this.obj.objectDto.id).subscribe({
        next:(res:boolean)=> {
          if(res) { this.refreshTable(); }
        }
      });
    }



}


