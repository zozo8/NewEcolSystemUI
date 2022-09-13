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
import { ITableButtonsComponent } from "src/app/Interfaces/table/ITableButtonsComponent";
import { UserDto } from "src/app/models/dto/userDto";
import { TableMenuService } from "src/app/universalComponents/table-menu/table-menu.service";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
  providers:[]
})


export class UsersComponent implements OnInit, ITableComponent, ITableButtonsComponent<UserDto> {
  columnPath = "/api/Users/GetUserGridData/Get";
  listPath = "/api/Users/GetUsers/Get";
  deletePath = "/api/Users/DeleteUser/Delete?id=";
  addPath = "/api/Users/ManageUser/Post";
  editPath = "/api/Users/ManageUser/Put";

  obj:TableMenuStructure = new TableMenuStructure();
  buttons:MenuItem[];
  tableFilter:LazyLoadEvent;
 // buttonsBS = new BehaviorSubject<MenuItem[]>([{}]);

  dataObj:Observable<ResponseBodyGetList>;
  columns:RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:10000});

  constructor(
   private tableService:TableService,
   private translateService:TranslateService,
   private tableMenuService:TableMenuService
  ) {
  }

  ngOnInit(): void {
    this.getColumns();
    this.buttons = this.getButtons();
   // this.buttonsBS.next(this.getButtons());

    // ustawiam nasłuchiwanie aby przy zmianie BS odpalił getResponseObj i zasilił tabele z danymi
    this.reqObjBS.subscribe(request=> {
      if(request?.pageNumber !== 10000) {
        this.dataObj = this.tableService.getResponseObj(this.listPath,request);
      }
    });
  }

  getColumns():void {
     this.tableService.getFilterColumnName(this.columnPath).subscribe({
      next:(res:RequestGridDataColumn)=> {
         this.columns = this.tableService.GetColumnsOutput(res.value);
      }, complete:()=> {
        this.prepareRequest();
      }
  });
  }

  prepareRequest(ev?:LazyLoadEvent):void {
    let requestObj = this.tableService.getRequestObj(this.columns, ev);
    this.reqObjBS.next(requestObj);
}

// emmiter from table components
  getRequestObjFromComponent(ev:LazyLoadEvent):void {
    this.tableFilter = ev;
    this.prepareRequest(this.tableFilter);
  }

  getSelectedObjFromComponent(ev:any):void {
    if(ev.data != null) {
      this.obj.objectDto = ev.data;
     this.obj.objectEditDto = {...ev.data}; // copy without reference
    }
  }

  //emmiter from detail component
  refreshTable():void {
    this.prepareRequest(this.tableFilter);
    this.obj.editState = false;
  }


  // buttons

  getButtons():MenuItem[] {
    return [
      {
        label:this.translateService.instant("btn.add"),
        icon:"pi pi-fw pi-plus",
        disabled:false,
        command:()=>this.add()
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
        command:()=>this.edit()
      },
      {
        label:this.translateService.instant("btn.refresh"),
        icon:"pi pi-fw pi-refresh",
        disabled:false,
        command:()=>this.prepareRequest(this.tableFilter)
      }
    ];
  }


  add(): void {
    this.tableMenuService.add(this.obj).subscribe({
      next:(res:TableMenuStructure)=>this.obj = res
    });

  }
  edit(): void {
    this.tableMenuService.edit(this.obj).subscribe({
      next:(res:TableMenuStructure)=>this.obj = res
    });
  }

  delete(): void {
      this.tableMenuService.delete(this.deletePath, this.obj.objectDto.id).subscribe({
        next:(res:boolean)=> {
          if(res) { this.refreshTable(); }
        }
      });
    }



}


