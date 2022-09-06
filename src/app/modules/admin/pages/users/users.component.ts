import { Component, OnInit} from "@angular/core";
import { LazyLoadEvent, MenuItem, MessageService } from "primeng/api";
import { BehaviorSubject, Observable} from "rxjs";
import { ITableComponent } from "src/app/Interfaces/table/ITableComponent";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { TableService } from "src/app/universalComponents/table/table.service";
import { TranslateService } from "@ngx-translate/core";
import { ITableCrudComponent } from "src/app/Interfaces/table/ITableCrudComponent";
import { UserDto } from "src/app/models/dto/userDto";
import { TableMenuService } from "src/app/universalComponents/table-menu/table-menu.service";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
  providers:[]
})


export class UsersComponent implements OnInit, ITableComponent, ITableCrudComponent<UserDto> {
  columnPath = "/api/Users/GetUserGridData/Get";
  listPath = "/api/Users/GetUsers/Get";
  addPath = "/api/Users/ManageUser/Post";
  editPath = "/api/Users/ManageUser/Put";
  deletePath = "/api/Users/DeleteUser/Delete?id=";

  tableMenuObj:TableMenuStructure<UserDto,UserDto> = new TableMenuStructure<{},{}>();
  buttons:MenuItem[];
  objectDto:UserDto;
  editState:boolean;
  objectEditDto:UserDto;
  submitValue:string;

  dataObj:Observable<ResponseBodyGetList>;
  columns:RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:10000});

  constructor(
   private tableService:TableService,
   private translateService:TranslateService,
   private messageService:MessageService,
   private tableMenuService:TableMenuService
  ) {
  }

  ngOnInit(): void {

  this.getColumns();
  this.buttons = this.getButtons();

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
        this.prepareRequest(null);
      }
  });
  }

  prepareRequest(ev:LazyLoadEvent | null):void {
    let requestObj = this.tableService.getRequestObj(this.columns, ev);
    this.reqObjBS.next(requestObj);
}

  getRequestObjFromComponent(ev:LazyLoadEvent):void {
    this.prepareRequest(ev);
  }

  getSelectedObjFromComponent(ev:any):void {
    if(ev.data != null) {
      this.objectDto = ev.data;
     this.objectEditDto = {...ev.data}; // copy without reference
    }
  }

  getButtons():MenuItem[] {
    return [
      {
        label:this.translateService.instant("btn.add"),
        icon:"pi pi-fw pi-plus",
        command:()=>this.add()
      },
      {
        label:this.translateService.instant("btn.remove"),
        icon:"pi pi-fw pi-minus",
        command:()=>this.delete()
      },
      {
        label:this.translateService.instant("btn.edit"),
        icon:"pi pi-fw pi-pencil",
        command:()=>this.edit()
      },
      {
        label:this.translateService.instant("btn.refresh"),
        icon:"pi pi-fw pi-refresh",
        command:()=>this.prepareRequest(null)
      }
    ];
  }


  add(): void {
    this.editState = true;
    this.submitValue = this.translateService.instant("btn.add");
    this.objectDto = {};
    this.objectEditDto = {};
  }
  edit(): void {

    // if(this.objectEditDto?.id !== null) {
    //   this.editState = true;
    //   this.submitValue = this.translateService.instant("btn.edit");
    // } else {
    //   this.messageService.add(
    //     {
    //       severity:"warn", summary:this.translateService.instant("btn.warning"), detail:this.translateService.instant("table-menu.select_record")
    //     });
    // }
  }
  delete(): void {
      this.tableMenuService.delete(this.deletePath, this.objectDto.id).subscribe({
        next:(res:boolean)=> {
          if(res) { this.rebuildAfterChangeObjectDto(); }
        }
      });
    }

  save():void {
    this.tableMenuService.save(this.objectEditDto,this.objectEditDto.id,this.addPath, this.editPath).subscribe({
      next:(res:boolean)=> {
        if(res) { this.rebuildAfterChangeObjectDto(); }
      }
    });
  }

  cancel():void {
    this.editState = false;
  }

  rebuildAfterChangeObjectDto():void {
    this.prepareRequest(null);
    this.editState = false;
  }

}


