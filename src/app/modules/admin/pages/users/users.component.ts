import { Component, OnInit} from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { BehaviorSubject, Observable} from "rxjs";
import { ITableComponent } from "src/app/Interfaces/table/ITableComponent";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { TableResponseService } from "src/app/services/table-response.service";
import { TranslateService } from "@ngx-translate/core";
import { ITableCrudComponent } from "src/app/Interfaces/table/ITableCrudComponent";
import { UserDto } from "src/app/models/dto/userDto";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})


export class UsersComponent implements OnInit, ITableComponent, ITableCrudComponent<UserDto>{
  columnPath = "/api/Users/GetUserGridData/Get";
  listPath = "/api/Users/GetUsers/Get";
  addPath = "/api/Users/ManageUser/Post";
  updatePath = "/api/Users/ManageUser/Put";
  deletePath = "/api/Users/DeleteUser/Delete";
  objectDto:UserDto;
  editState:boolean;
  objectEditDto:UserDto = {} as UserDto;
  dataObj:Observable<ResponseBodyGetList>;
  columns:RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:10000});

  constructor(
   private service:TableResponseService,
   private translateService:TranslateService
  ) { }

  ngOnInit(): void {

  this.getColumns();

   this.reqObjBS.subscribe(request=> {
    if(request?.pageNumber !== 10000){
      this.dataObj = this.service.getResponseObj(this.listPath,request);
    }
   });
  }

  getColumns():void {
     this.service.getFilterColumnName(this.columnPath).subscribe({
      next:(res:RequestGridDataColumn)=> {
         this.columns = this.service.GetColumnsOutput(res.value);
      }, complete:()=> {
        this.prepareRequest(null);
      }
  });
  }

  prepareRequest(ev:LazyLoadEvent | null):void {
    let requestObj = this.service.getRequestObj(this.columns, ev);
    this.reqObjBS.next(requestObj);
}

  getRequestObjFromComponent(ev:LazyLoadEvent):void {
    this.prepareRequest(ev);
  }

  getSelectedObjFromComponent(ev:any):void {
    if(ev.data != null){
      this.objectDto = ev.data;
      this.objectEditDto = {...ev.data}; //copy without reference
      //this.objectDto = this.userService.getNewObject(ev.data);
    }
  }


  add(obj: UserDto): void {
    throw new Error("Method not implemented.");
  }
  edit(obj: UserDto): void {
    throw new Error("Method not implemented.");
  }
  delete(id: number): void {
    throw new Error("Method not implemented.");
  }

}


